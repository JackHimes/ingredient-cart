import 'reflect-metadata';
import { expect } from 'chai';
import { container } from 'tsyringe';
import { MongoService } from '../../services/mongoService';
import { RecipesService } from '../../recipes/recipesService';
import { RecipeCreationParams } from '../../recipes/recipe';
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
    const recipes = await recipesService.find({});
    expect(recipes).to.be.an('array');
  });

  it('should create a new recipe with default popularity', async function() {
    const recipe: RecipeCreationParams = {
      title: 'Test Recipe',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: ['Step 1', 'Step 2'],
      url: 'http://example.com',
      image: 'http://example.com/image.jpg',
      description: 'A test recipe',
      createdBy: 'testuser',
    };
    const createdRecipe = await recipesService.create(recipe);
    expect(createdRecipe.popularity).to.equal(0); 
    const recipes = await recipesService.find({});
    expect(recipes.length).to.be.greaterThan(0);
    expect(recipes[0].popularity).to.equal(0);
  });

  it('should get a recipe by id', async function() {
    const recipe: RecipeCreationParams = {
      title: 'Test Recipe',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: ['Step 1', 'Step 2'],
      url: 'http://example.com',
      image: 'http://example.com/image.jpg',
      description: 'A test recipe',
      createdBy: 'testuser',
    };
    const createdRecipe = await recipesService.create(recipe);
    const fetchedRecipe = await recipesService.get(createdRecipe._id.toString());
    expect(fetchedRecipe).to.deep.equal({ ...recipe, _id: createdRecipe._id });
  });
});