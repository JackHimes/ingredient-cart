import { ObjectId } from "mongodb";
import { ApiService } from "../services/apiService";
import {
  Recipe,
  RecipeCreationParams,
  RecipeQueryParams,
  RecipeUpdateParams,
} from "./recipe";

export class RecipesService extends ApiService {
  constructor() {
    super();
  }

  public async find(query: RecipeQueryParams): Promise<Recipe[]> {
    let recipes = await this.db.collection("recipes").find(query).toArray();
    return recipes as unknown as Recipe[];
  }

  public async get(id: string): Promise<Recipe> {
    let query: RecipeQueryParams = { _id: new ObjectId(id) };
    let result = (await this.db
      .collection("recipes")
      .findOne(query)) as unknown as Recipe;
    return result;
  }
  
  public async create(recipeData: RecipeCreationParams): Promise<Recipe> {
    const newRecipe = {
      ...recipeData,
      _id: new ObjectId(),
      createdAt: new Date(),
      popularity: 0
    };

    await this.db.collection("recipes").insertOne(newRecipe);
    return newRecipe as Recipe;
  }

  public async update(
    id: string,
    recipeUpdateParams: RecipeUpdateParams
  ): Promise<void> {
    await this.db
      .collection("recipes")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...recipeUpdateParams } }
      );
    return;
  }

  public async getPopularRecipes(limit: number): Promise<Recipe[]> {
    try {
      console.log("Fetching popular recipes with limit:", limit);
      const popularRecipes = await this.db
        .collection("recipes")
        .find()
        .sort({ popularity: -1 })
        .limit(limit)
        .toArray();
      console.log("Popular recipes fetched:", popularRecipes);
      return popularRecipes as unknown as Recipe[];
    } catch (error) {
      console.error("Error in getPopularRecipes:", error);
      throw new Error("Failed to fetch popular recipes");
    }
  }
}
