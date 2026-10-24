import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Request,
  Route,
  Security,
  SuccessResponse,
} from "tsoa";
import { Request as ExRequest } from "express";
import {
  Pantry,
  PantryIngredient,
  PantryIngredientCreationParams,
  PantryIngredientUpdateParams,
  PantrySortField,
  SortOrder,
} from "./pantry";
import { PantryService } from "./pantryService";
import { Category } from "../ingredients/ingredient";
import { CLERK_SECURITY, getAuthUser } from "../authentication";

// Every route works on the signed-in user's own pantry, identified by their verified Clerk session token
@Route("pantry")
@Security(CLERK_SECURITY)
export class PantryController extends Controller {
  private pantryService: PantryService;

  constructor() {
    super();
    this.pantryService = new PantryService();
  }

  @Get()
  public async getPantry(@Request() request: ExRequest): Promise<Pantry> {
    return this.pantryService.getOrCreate(getAuthUser(request).userId);
  }

  /**
   * @param search Case-insensitive match on ingredient name
   * @param category Only return ingredients in this category
   * @param addedAfter Only return ingredients added on or after this date
   */
  @Get("ingredients")
  public async findPantryIngredients(
    @Request() request: ExRequest,
    @Query() search?: string,
    @Query() category?: Category,
    @Query() addedAfter?: Date,
    @Query() sortBy?: PantrySortField,
    @Query() order?: SortOrder
  ): Promise<PantryIngredient[]> {
    return this.pantryService.findIngredients(getAuthUser(request).userId, {
      search,
      category,
      addedAfter,
      sortBy,
      order,
    });
  }

  @Get("categories")
  public async getPantryCategories(@Request() request: ExRequest): Promise<Category[]> {
    return this.pantryService.getCategories(getAuthUser(request).userId);
  }

  @SuccessResponse("201", "Created")
  @Post("ingredients")
  public async addPantryIngredient(
    @Request() request: ExRequest,
    @Body() body: PantryIngredientCreationParams
  ): Promise<PantryIngredient> {
    const ingredient = await this.pantryService.addIngredient(getAuthUser(request).userId, body);
    this.setStatus(201);
    return ingredient;
  }

  @Patch("ingredients/{pantryIngredientId}")
  public async updatePantryIngredient(
    @Request() request: ExRequest,
    @Path() pantryIngredientId: string,
    @Body() body: PantryIngredientUpdateParams
  ): Promise<PantryIngredient> {
    return this.pantryService.updateIngredient(getAuthUser(request).userId, pantryIngredientId, body);
  }

  @Delete("ingredients/{pantryIngredientId}")
  public async removePantryIngredient(
    @Request() request: ExRequest,
    @Path() pantryIngredientId: string
  ): Promise<void> {
    await this.pantryService.removeIngredient(getAuthUser(request).userId, pantryIngredientId);
  }
}
