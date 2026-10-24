import 'reflect-metadata';
import { expect } from 'chai';
import { container } from 'tsyringe';
import { MongoService } from '../../services/mongoService';
import { PantryService } from '../../pantry/pantryService';
import ApiError from '../../lib/ApiError';
import { Db, MongoClient } from 'mongodb';

describe('PantryService', function() {
  const userId = 'user_pantry_test';
  let db: Db;
  let client: MongoClient;
  let pantryService: PantryService;

  before(async function() {
    const mongoUrl = process.env.MONGO_DB_URL;
    if (!mongoUrl) {
      throw new Error('MONGO_DB_URL environment variable is not set');
    }

    client = new MongoClient(mongoUrl);
    await client.connect();
    db = client.db('test');
    // Start from fresh collections so indexes left by an older schema (e.g. pantries.userEmail) can't interfere
    for (const name of ['pantries', 'pantryItems', 'ingredients']) {
      await db.dropCollection(name).catch(() => undefined);
    }

    const mongoService = new MongoService();
    mongoService.db = db;
    container.registerInstance(MongoService, mongoService);
  });

  beforeEach(async function() {
    await db.collection('pantries').deleteMany({});
    await db.collection('pantryItems').deleteMany({});
    await db.collection('ingredients').deleteMany({});
    pantryService = new PantryService();
  });

  after(async function() {
    await db.collection('pantries').deleteMany({});
    await db.collection('pantryItems').deleteMany({});
    await db.collection('ingredients').deleteMany({});
    await client.close();
  });

  it('should create a single pantry per user', async function() {
    const first = await pantryService.getOrCreate(userId);
    const second = await pantryService.getOrCreate(userId);
    expect(first._id.equals(second._id)).to.equal(true);
    expect(await db.collection('pantries').countDocuments({ userId })).to.equal(1);
    expect(await pantryService.findIngredients(userId, {})).to.deep.equal([]);
  });

  it('should add a copy of a catalog ingredient with timestamps', async function() {
    const added = await pantryService.addIngredient(userId, {
      name: 'Flour',
      quantity: 2,
      unit: 'lb',
      category: 'Baking',
    });

    const catalogEntry = await db.collection('ingredients').findOne({ name: 'Flour' });
    expect(catalogEntry).to.not.equal(null);
    expect(added.ingredientId.equals(catalogEntry!._id)).to.equal(true);
    expect(catalogEntry!.normalizedName).to.equal('flour');
    expect(catalogEntry!.source).to.equal('user');
    expect(await db.collection('pantryItems').countDocuments({ pantryId: added.pantryId })).to.equal(1);
    expect(added.quantity).to.equal(2);
    expect(added.createdAt).to.be.instanceOf(Date);
    expect(added.updatedAt).to.be.instanceOf(Date);

    // Editing the pantry copy leaves the catalog entry untouched
    await pantryService.updateIngredient(userId, added._id.toString(), { name: 'Bread Flour' });
    const catalogAfter = await db.collection('ingredients').findOne({ _id: catalogEntry!._id });
    expect(catalogAfter!.name).to.equal('Flour');
    const [renamed] = await pantryService.findIngredients(userId, { search: 'bread' });
    expect(renamed.normalizedName).to.equal('bread flour');
  });

  it('should match catalog names ignoring case and extra whitespace', async function() {
    await pantryService.addIngredient(userId, { name: '  Brown   Sugar ', quantity: 1 });
    await pantryService.addIngredient('user_someone_else', { name: 'brown sugar', quantity: 1 });
    const catalog = await db.collection('ingredients').find({}).toArray();
    expect(catalog.map((i) => i.name)).to.deep.equal(['Brown Sugar']);
  });

  it('should create only one catalog entry for concurrent adds of the same name', async function() {
    const userIds = ['user_a', 'user_b', 'user_c', 'user_d'];
    await Promise.all(userIds.map((id) => pantryService.addIngredient(id, { name: 'Rice', quantity: 1 })));
    expect(await db.collection('ingredients').countDocuments({ normalizedName: 'rice' })).to.equal(1);
    expect(await db.collection('pantryItems').countDocuments({})).to.equal(4);
  });

  it('should reuse catalog ingredients and reject duplicates in the same pantry', async function() {
    await pantryService.addIngredient(userId, { name: 'Eggs', quantity: 12 });
    await pantryService.addIngredient('user_someone_else', { name: 'eggs', quantity: 6 });
    expect(await db.collection('ingredients').countDocuments({})).to.equal(1);

    try {
      await pantryService.addIngredient(userId, { name: 'EGGS', quantity: 1 });
      expect.fail('Expected a duplicate error');
    } catch (error) {
      expect(error).to.be.instanceOf(ApiError);
      expect((error as ApiError).statusCode).to.equal(409);
    }
  });

  it('should search, filter and sort pantry ingredients', async function() {
    await pantryService.addIngredient(userId, { name: 'brown sugar', quantity: 1, category: 'Baking' });
    await pantryService.addIngredient(userId, { name: 'Apples', quantity: 6, category: 'Produce' });
    await pantryService.addIngredient(userId, { name: 'Sugar', quantity: 3, category: 'Baking' });

    const byName = await pantryService.findIngredients(userId, { sortBy: 'name', order: 'asc' });
    expect(byName.map((i) => i.name)).to.deep.equal(['Apples', 'brown sugar', 'Sugar']);

    const byQuantity = await pantryService.findIngredients(userId, { sortBy: 'quantity', order: 'desc' });
    expect(byQuantity.map((i) => i.quantity)).to.deep.equal([6, 3, 1]);

    const newestFirst = await pantryService.findIngredients(userId, {});
    expect(newestFirst[0].name).to.equal('Sugar');

    const searched = await pantryService.findIngredients(userId, { search: 'SUGAR', sortBy: 'name', order: 'asc' });
    expect(searched.map((i) => i.name)).to.deep.equal(['brown sugar', 'Sugar']);

    const produce = await pantryService.findIngredients(userId, { category: 'Produce' });
    expect(produce.map((i) => i.name)).to.deep.equal(['Apples']);

    const future = new Date(Date.now() + 60_000);
    expect(await pantryService.findIngredients(userId, { addedAfter: future })).to.deep.equal([]);

    // Ordered like the fixed category list, not alphabetically
    expect(await pantryService.getCategories(userId)).to.deep.equal(['Produce', 'Baking']);
  });

  it('should update quantity and bump updatedAt', async function() {
    const added = await pantryService.addIngredient(userId, { name: 'Milk', quantity: 1 });
    const updated = await pantryService.updateIngredient(userId, added._id.toString(), { quantity: 0.5 });
    expect(updated.quantity).to.equal(0.5);
    expect(updated.createdAt.getTime()).to.equal(added.createdAt.getTime());
    expect(updated.updatedAt.getTime()).to.be.at.least(added.updatedAt.getTime());
  });

  it('should remove an ingredient', async function() {
    const added = await pantryService.addIngredient(userId, { name: 'Butter', quantity: 1 });
    await pantryService.removeIngredient(userId, added._id.toString());
    expect(await pantryService.findIngredients(userId, {})).to.deep.equal([]);

    try {
      await pantryService.removeIngredient(userId, added._id.toString());
      expect.fail('Expected a not found error');
    } catch (error) {
      expect((error as ApiError).statusCode).to.equal(404);
    }
  });
});
