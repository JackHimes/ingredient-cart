import 'reflect-metadata';
import { expect } from 'chai';
import { container } from 'tsyringe';
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
    container.registerInstance(RecipesService, recipesService);
    recipesController = new RecipesController(recipesService);
  });

  afterEach(function() {
    container.clearInstances();
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
      },
    ];

    recipesService.find.resolves(expectedRecipes);

    const recipes = await recipesController.getRecipes();
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
    };

    await recipesController.createRecipe(newRecipe);
    sinon.assert.calledOnceWithExactly(recipesService.create, newRecipe);
  });
});