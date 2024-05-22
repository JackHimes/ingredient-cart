import { ApiService } from "../services/apiService";
import { Recipe, RecipeCreationParams } from "./recipe";

export class RecipesService extends ApiService {
  constructor() {
    super();
  }
  public async find(): Promise<Recipe[]> {
    return (await this.db.collection("recipes").find().toArray()) as Recipe[];
  }

  public async create(recipeParams: RecipeCreationParams): Promise<void> {
    await this.db.collection("recipes").insertOne(recipeParams);
  }
}
