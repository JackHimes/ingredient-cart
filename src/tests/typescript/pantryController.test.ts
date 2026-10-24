import 'reflect-metadata';
import { expect } from 'chai';
import { ObjectId } from 'mongodb';
import { Request as ExRequest } from 'express';
import sinon, { SinonStubbedInstance } from 'sinon';
import { PantryController } from '../../pantry/pantryController';
import { PantryService } from '../../pantry/pantryService';
import { PantryIngredient } from '../../pantry/pantry';
import { expressAuthentication } from '../../authentication';
import ApiError from '../../lib/ApiError';

describe('PantryController', function() {
  const userId = 'user_pantry_test';
  // What tsoa hands the controller after expressAuthentication has verified the token
  const request = { user: { userId } } as unknown as ExRequest;
  let pantryService: SinonStubbedInstance<PantryService>;
  let pantryController: PantryController;

  beforeEach(function() {
    pantryService = sinon.createStubInstance(PantryService);
    pantryController = new PantryController();
    (pantryController as any).pantryService = pantryService; // Inject the stubbed service
  });

  afterEach(function() {
    sinon.restore();
  });

  it('should pass the signed-in user and search, filter and sort params to the service', async function() {
    pantryService.findIngredients.resolves([]);
    const addedAfter = new Date('2026-01-01');

    await pantryController.findPantryIngredients(request, 'sugar', 'Baking', addedAfter, 'name', 'asc');
    sinon.assert.calledOnceWithExactly(pantryService.findIngredients, userId, {
      search: 'sugar',
      category: 'Baking',
      addedAfter,
      sortBy: 'name',
      order: 'asc',
    });
  });

  it('should add an ingredient and return 201', async function() {
    const now = new Date();
    const added: PantryIngredient = {
      _id: new ObjectId(),
      pantryId: new ObjectId(),
      ingredientId: new ObjectId(),
      name: 'Flour',
      normalizedName: 'flour',
      quantity: 2,
      createdAt: now,
      updatedAt: now,
    };
    pantryService.addIngredient.resolves(added);

    const result = await pantryController.addPantryIngredient(request, { name: 'Flour', quantity: 2 });
    sinon.assert.calledOnceWithExactly(pantryService.addIngredient, userId, { name: 'Flour', quantity: 2 });
    expect(result).to.deep.equal(added);
    expect(pantryController.getStatus()).to.equal(201);
  });
});

describe('expressAuthentication', function() {
  const authenticate = (authorization?: string) =>
    expressAuthentication({ headers: { authorization } } as ExRequest, 'clerk');

  const expectUnauthorized = async (promise: Promise<unknown>) => {
    try {
      await promise;
      expect.fail('expected a 401');
    } catch (error) {
      expect(error).to.be.instanceOf(ApiError);
      expect((error as ApiError).statusCode).to.equal(401);
    }
  };

  it('should reject a request without a bearer token', async function() {
    await expectUnauthorized(authenticate());
    await expectUnauthorized(authenticate('Basic abc123'));
  });

  it('should reject a token that is not a valid Clerk session', async function() {
    await expectUnauthorized(authenticate('Bearer not-a-real-token'));
  });
});
