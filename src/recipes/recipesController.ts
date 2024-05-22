import { Body, Controller, Get, Post, Route, SuccessResponse } from "tsoa";
import { Recipe, RecipeCreationParams } from "./recipe";
import { RecipesService } from "./recipesService";
import { inject, injectable } from 'tsyringe';

@Route("recipes")
@injectable()
export class RecipesController extends Controller {
  constructor(@inject(RecipesService) private recipesService: RecipesService) {
    super();
  }

  @Get()
  public async getRecipes(): Promise<Recipe[]> {
    try {
      return this.recipesService.find();
    } catch (error) {
      this.setStatus(500);
      throw error;
    }  }

  @SuccessResponse("201", "Recipe Created")
  @Post()
  public async createRecipe(@Body() recipeParams: RecipeCreationParams): Promise<void> {
    try {
      this.setStatus(201);
      await this.recipesService.create(recipeParams);
    } catch (error) {
      this.setStatus(500);
      throw error;
    }
  }
}
