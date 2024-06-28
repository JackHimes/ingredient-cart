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

  public async create(recipeData: RecipeCreationParams): Promise<Recipe> {
    const newRecipe: Recipe = {
      _id: new ObjectId(),
      ...recipeData,
      popularity: 0
    };

    await this.db.collection("recipes").insertOne(newRecipe);
    return newRecipe;
  }

  public async update(id: string, recipeUpdateParams: RecipeUpdateParams): Promise<void> {
    await this.db
      .collection("recipes")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...recipeUpdateParams } }
      );
  }

  public async find(query: RecipeQueryParams): Promise<Recipe[]> {
    let dbQuery: any = {};
    if (query.title) {
      dbQuery.title = { $regex: query.title, $options: 'i' };
    }
    let recipes = await this.db.collection("recipes").find(dbQuery).toArray();
    return recipes as Recipe[];
  }

  public async get(id: string): Promise<Recipe> {
    let query: RecipeQueryParams = { _id: new ObjectId(id) };
    let result = await this.db.collection("recipes").findOne(query);
    if (!result) {
      throw new Error("Recipe not found");
    }
    return result as Recipe;
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
