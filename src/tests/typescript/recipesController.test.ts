import 'reflect-metadata';
import { expect } from 'chai';
import { RecipesController } from '../../recipes/recipesController';
import { RecipesService } from '../../recipes/recipesService';
import { Recipe, RecipeCreationParams } from '../../recipes/recipe';
import { ObjectId } from 'mongodb';
import sinon, { SinonStubbedInstance } from 'sinon';

describe('RecipesController', function() {
  let recipesService: SinonStubbedInstance<RecipesService>;
  let recipesController: RecipesController;

  beforeEach(function() {
    recipesService = sinon.createStubInstance(RecipesService);
    recipesController = new RecipesController();
    (recipesController as any).recipesService = recipesService; // Inject the stubbed service
  });

  afterEach(function() {
    sinon.restore();
  });

  it('should get all recipes', async function() {
    const expectedRecipes: Recipe[] = [
      {
        _id: new ObjectId(),
        title: 'Test Recipe',
        ingredients: ['Ingredient 1', 'Ingredient 2'],
        instructions: ['Step 1', 'Step 2'],
        url: 'http://example.com',
        image: 'http://example.com/image.jpg',
        popularity: 5,
        description: 'A test recipe',
        createdBy: 'testuser',
      },
    ];

    recipesService.find.resolves(expectedRecipes);

    const recipes = await recipesController.findRecipes();
    expect(recipes).to.deep.equal(expectedRecipes);
    sinon.assert.calledOnce(recipesService.find);
  });

  it('should create a new recipe', async function() {
    const newRecipe: RecipeCreationParams = {
      title: 'New Recipe',
      ingredients: ['Ingredient 1'],
      instructions: ['Step 1'],
      url: 'http://example.com',
      image: 'http://example.com/image.jpg',
      description: 'A test recipe',
      createdBy: 'testuser',
    };

    await recipesController.createRecipe(newRecipe);
    sinon.assert.calledOnceWithExactly(recipesService.create, newRecipe);
  });

  it('should get a recipe by id', async function() {
    const recipeId = new ObjectId().toString();
    const expectedRecipe: Recipe = {
      _id: new ObjectId(recipeId),
      title: 'Test Recipe',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: ['Step 1', 'Step 2'],
      url: 'http://example.com',
      image: 'http://example.com/image.jpg',
      popularity: 5,
      description: 'A test recipe',
      createdBy: 'testuser',
    };

    recipesService.get.resolves(expectedRecipe);

    const recipe = await recipesController.getRecipe(recipeId);
    expect(recipe).to.deep.equal(expectedRecipe);
    sinon.assert.calledOnceWithExactly(recipesService.get, recipeId);
  });
});