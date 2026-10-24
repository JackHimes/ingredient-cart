import { ApiService } from "../services/apiService";
import ApiError from "../lib/ApiError";
import { cleanName, escapeRegex, isDuplicateKeyError, normalizeName, toObjectId } from "../lib/queryUtils";
import { Ingredient, IngredientCreationParams } from "./ingredient";

let indexesCreated: Promise<string> | null = null;

export class IngredientsService extends ApiService {
  constructor() {
    super();
  }

  private ensureIndexes(): Promise<string> {
    if (!indexesCreated) {
      indexesCreated = this.db
        .collection("ingredients")
        .createIndex({ normalizedName: 1 }, { unique: true });
      // Don't cache a failure (e.g. existing data that breaks a unique index), retry on the next request
      indexesCreated.catch(() => {
        indexesCreated = null;
      });
    }
    return indexesCreated;
  }

  public async find(name?: string, limit: number = 20): Promise<Ingredient[]> {
    const dbQuery = name
      ? { normalizedName: { $regex: escapeRegex(normalizeName(name)) } }
      : {};
    const ingredients = await this.db
      .collection("ingredients")
      .find(dbQuery)
      .sort({ normalizedName: 1 })
      .limit(limit)
      .toArray();
    return ingredients as Ingredient[];
  }

  public async get(id: string): Promise<Ingredient> {
    const result = await this.db
      .collection("ingredients")
      .findOne({ _id: toObjectId(id) });
    if (!result) {
      throw new ApiError("IngredientNotFound", 404, `No ingredient found for ${id}`);
    }
    return result as Ingredient;
  }

  // Returns the catalog entry matching the name (case/whitespace-insensitive), creating it if it doesn't exist yet
  public async findOrCreate(params: IngredientCreationParams): Promise<Ingredient> {
    const name = cleanName(params.name);
    if (!name) {
      throw new ApiError("ValidationError", 400, "Ingredient name is required");
    }
    await this.ensureIndexes();

    const normalizedName = normalizeName(name);
    const now = new Date();
    const upsert = () =>
      this.db.collection("ingredients").findOneAndUpdate(
        { normalizedName },
        {
          $setOnInsert: {
            name,
            normalizedName,
            ...(params.unit && { unit: params.unit }),
            ...(params.category && { category: params.category }),
            source: "user",
            createdAt: now,
            updatedAt: now,
          },
        },
        { upsert: true, returnDocument: "after" }
      );

    try {
      return (await upsert()) as Ingredient;
    } catch (error) {
      // Two concurrent upserts for the same name: one wins the unique index, the other retries and finds it
      if (isDuplicateKeyError(error)) {
        return (await upsert()) as Ingredient;
      }
      throw error;
    }
  }
}
