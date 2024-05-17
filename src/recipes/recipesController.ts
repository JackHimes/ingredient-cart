import { Body, Controller, Get, Post, Route, SuccessResponse } from "tsoa";
import { Recipe, RecipeCreationParams } from "./recipe";
import { RecipesService } from "./recipesService";

@Route("recipes")
export class RecipesController extends Controller {
  @Get()
  public async getRecipes(): Promise<Recipe[]> {
    return new RecipesService().find();
  }

  @SuccessResponse("201", "Recipe Created")
  @Post()
  public async createRecipe(@Body() recipeParams: RecipeCreationParams): Promise<void> {
    this.setStatus(201);
    new RecipesService().create(recipeParams);
    return;
  }
}
