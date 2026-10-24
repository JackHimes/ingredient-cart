import { Document, ObjectId } from "mongodb";
import { ApiService } from "../services/apiService";
import ApiError from "../lib/ApiError";
import { cleanName, escapeRegex, isDuplicateKeyError, normalizeName, toObjectId } from "../lib/queryUtils";
import { IngredientsService } from "../ingredients/ingredientsService";
import { CATEGORIES, Category, Ingredient } from "../ingredients/ingredient";
import {
  Pantry,
  PantryIngredient,
  PantryIngredientCreationParams,
  PantryIngredientQueryParams,
  PantryIngredientUpdateParams,
} from "./pantry";

const SORT_FIELDS = {
  name: "normalizedName",
  quantity: "quantity",
  createdAt: "createdAt",
} as const;

let indexesCreated: Promise<unknown> | null = null;

export class PantryService extends ApiService {
  private ingredientsService: IngredientsService;

  constructor() {
    super();
    this.ingredientsService = new IngredientsService();
  }

  private get pantries() {
    return this.db.collection<Pantry>("pantries");
  }

  private get items() {
    return this.db.collection<PantryIngredient>("pantryItems");
  }

  private ensureIndexes(): Promise<unknown> {
    if (!indexesCreated) {
      indexesCreated = Promise.all([
        // One pantry per user
        this.pantries.createIndex({ userId: 1 }, { unique: true }),
        // Each catalog ingredient appears at most once per pantry
        this.items.createIndex({ pantryId: 1, ingredientId: 1 }, { unique: true }),
        this.items.createIndex({ pantryId: 1, createdAt: -1 }),
        this.items.createIndex({ pantryId: 1, normalizedName: 1 }),
        this.items.createIndex({ pantryId: 1, category: 1 }),
      ]);
      // Don't cache a failure (e.g. existing data that breaks a unique index), retry on the next request
      indexesCreated.catch(() => {
        indexesCreated = null;
      });
    }
    return indexesCreated;
  }

  // Returns the user's pantry, creating an empty one on first access
  public async getOrCreate(userId: string): Promise<Pantry> {
    await this.ensureIndexes();
    const now = new Date();
    const result = await this.pantries.findOneAndUpdate(
      { userId },
      { $setOnInsert: { userId, createdAt: now, updatedAt: now } },
      { upsert: true, returnDocument: "after" }
    );
    return result as Pantry;
  }

  public async findIngredients(
    userId: string,
    query: PantryIngredientQueryParams
  ): Promise<PantryIngredient[]> {
    const pantry = await this.getOrCreate(userId);

    const filter: Document = { pantryId: pantry._id };
    if (query.search) {
      filter.normalizedName = { $regex: escapeRegex(normalizeName(query.search)) };
    }
    if (query.category) {
      filter.category = query.category;
    }
    if (query.addedAfter) {
      filter.createdAt = { $gte: query.addedAfter };
    }

    const direction = query.order === "asc" ? 1 : -1;
    return this.items
      .find(filter)
      .sort({ [SORT_FIELDS[query.sortBy ?? "createdAt"]]: direction, _id: direction })
      .toArray();
  }

  // Categories in use in this pantry, in the same order as the fixed category list
  public async getCategories(userId: string): Promise<Category[]> {
    const pantry = await this.getOrCreate(userId);
    const used = await this.items.distinct("category", { pantryId: pantry._id });
    return CATEGORIES.filter((category) => used.includes(category));
  }

  public async addIngredient(
    userId: string,
    params: PantryIngredientCreationParams
  ): Promise<PantryIngredient> {
    if (params.quantity < 0) {
      throw new ApiError("ValidationError", 400, "Quantity cannot be negative");
    }

    let catalogIngredient: Ingredient;
    if (params.ingredientId) {
      catalogIngredient = await this.ingredientsService.get(params.ingredientId);
    } else if (params.name?.trim()) {
      catalogIngredient = await this.ingredientsService.findOrCreate({
        name: params.name,
        unit: params.unit,
        category: params.category,
      });
    } else {
      throw new ApiError("ValidationError", 400, "Either ingredientId or name is required");
    }

    const pantry = await this.getOrCreate(userId);
    // Values sent by the user take precedence over the catalog defaults
    const unit = params.unit || catalogIngredient.unit;
    const category = params.category || catalogIngredient.category;
    const now = new Date();
    const pantryIngredient: PantryIngredient = {
      _id: new ObjectId(),
      pantryId: pantry._id,
      ingredientId: catalogIngredient._id,
      name: catalogIngredient.name,
      normalizedName: catalogIngredient.normalizedName,
      quantity: params.quantity,
      ...(unit && { unit }),
      ...(category && { category }),
      createdAt: now,
      updatedAt: now,
    };

    try {
      await this.items.insertOne(pantryIngredient);
    } catch (error) {
      if (isDuplicateKeyError(error)) {
        throw new ApiError(
          "DuplicateIngredient",
          409,
          `${catalogIngredient.name} is already in your pantry, update its quantity instead`
        );
      }
      throw error;
    }
    return pantryIngredient;
  }

  public async updateIngredient(
    userId: string,
    pantryIngredientId: string,
    params: PantryIngredientUpdateParams
  ): Promise<PantryIngredient> {
    if (params.quantity !== undefined && params.quantity < 0) {
      throw new ApiError("ValidationError", 400, "Quantity cannot be negative");
    }
    if (params.name !== undefined && !params.name.trim()) {
      throw new ApiError("ValidationError", 400, "Ingredient name cannot be empty");
    }

    const updates: Document = { updatedAt: new Date() };
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        updates[key] = value;
      }
    }
    if (params.name !== undefined) {
      updates.name = cleanName(params.name);
      updates.normalizedName = normalizeName(params.name);
    }

    const pantry = await this.getOrCreate(userId);
    const updated = await this.items.findOneAndUpdate(
      { _id: toObjectId(pantryIngredientId), pantryId: pantry._id },
      { $set: updates },
      { returnDocument: "after" }
    );
    if (!updated) {
      throw new ApiError("PantryIngredientNotFound", 404, `No pantry ingredient found for ${pantryIngredientId}`);
    }
    return updated;
  }

  public async removeIngredient(userId: string, pantryIngredientId: string): Promise<void> {
    const pantry = await this.getOrCreate(userId);
    const result = await this.items.deleteOne({
      _id: toObjectId(pantryIngredientId),
      pantryId: pantry._id,
    });
    if (result.deletedCount === 0) {
      throw new ApiError("PantryIngredientNotFound", 404, `No pantry ingredient found for ${pantryIngredientId}`);
    }
  }
}
