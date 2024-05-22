import 'reflect-metadata';
import { expect } from 'chai';
import { container } from 'tsyringe';
import { MongoService } from '../../services/mongoService';
import { RecipesService } from '../../recipes/recipesService';
import { Recipe } from '../../recipes/recipe';
import { Db, MongoClient } from 'mongodb';

describe('RecipesService', function() {
  let mongoService: MongoService;
  let db: Db;
  let client: MongoClient;
  let recipesService: RecipesService;

  before(async function() {
    const mongoUrl = process.env.MONGO_DB_URL;
    if (!mongoUrl) {
      throw new Error('MONGO_DB_URL environment variable is not set');
    }

    client = new MongoClient(mongoUrl);
    await client.connect();
    db = client.db('test');
    
    mongoService = new MongoService();
    mongoService.db = db;
    container.registerInstance(MongoService, mongoService);

    recipesService = container.resolve(RecipesService);
  });

  after(async function() {
      await db.collection('recipes').deleteMany({});
      await client.close();
  });

  it('should find all recipes', async function() {
    const recipes = await recipesService.find();
    expect(recipes).to.be.an('array');
  });

  it('should create a new recipe', async function() {
    const recipe: Partial<Recipe> = {
      title: 'Test Recipe',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: ['Step 1', 'Step 2'],
      url: 'http://example.com',
      image: 'http://example.com/image.jpg'
    };
    await recipesService.create(recipe);
    const recipes = await recipesService.find();
    expect(recipes.length).to.be.greaterThan(0);
  });
});