import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Patch,
  SuccessResponse,
} from "tsoa";
import {
  Recipe,
  RecipeCreationParams,
  RecipeQueryParams,
  RecipeUpdateParams,
} from "./recipe";
import { RecipesService } from "./recipesService";

@Route("recipes")
export class RecipesController extends Controller {
  private recipesService: RecipesService;

  constructor() {
    super();
    this.recipesService = new RecipesService();
  }

  @Get("popular")
  public async getPopularRecipes(@Query() limit: number = 10): Promise<Recipe[]> {
    try {
      return await this.recipesService.getPopularRecipes(limit);
    } catch (error) {
      console.error("Error in getPopularRecipes endpoint:", error);
      throw error;
    }
  }

  @Get()
  public async findRecipes(@Query() title?: string): Promise<Recipe[]> {
    let query: RecipeQueryParams = {};
    if (title) {
      query["title"] = title;
    }
    return this.recipesService.find(query);
  }

  @Get("{recipeId}")
  public async getRecipe(@Path() recipeId: string): Promise<Recipe> {
    return this.recipesService.get(recipeId);
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createRecipe(@Body() requestBody: RecipeCreationParams): Promise<Recipe> {
    try {
      const newRecipe = await this.recipesService.create(requestBody);
      this.setStatus(201);
      return newRecipe;
    } catch (error) {
      this.setStatus(500);
      console.error("Error creating new recipe:", error);
      throw new Error("Failed to create new recipe");
    }
  }

  @Patch("{recipeId}")
  public async updateRecipe(
    @Path() recipeId: string,
    @Body() body: RecipeUpdateParams
  ): Promise<void> {
    await this.recipesService.update(recipeId, body);
  }
}