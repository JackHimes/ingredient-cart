import { Body, Controller, Get, Post, Route, SuccessResponse } from "tsoa";
import { Recipe, RecipeCreationParams } from "./recipe";
import { RecipesService } from "./recipesService";

@Route("recipes")
export class RecipesController extends Controller {
  private recipesService: RecipesService;

  constructor(recipesService?: RecipesService) {
    super();
    this.recipesService = recipesService || new RecipesService();
  }

  @Get()
  public async getRecipes(): Promise<Recipe[]> {
    return this.recipesService.find();
  }

  @SuccessResponse("201", "Recipe Created")
  @Post()
  public async createRecipe(@Body() recipeParams: RecipeCreationParams): Promise<void> {
    this.setStatus(201);
    this.recipesService.create(recipeParams);
    return;
  }
}
