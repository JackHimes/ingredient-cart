import { Controller, Get, Path, Query, Route } from "tsoa";
import { CATEGORIES, Category, Ingredient, Unit, UNITS } from "./ingredient";
import { IngredientsService } from "./ingredientsService";

@Route("ingredients")
export class IngredientsController extends Controller {
  private ingredientsService: IngredientsService;

  constructor() {
    super();
    this.ingredientsService = new IngredientsService();
  }

  @Get()
  public async findIngredients(
    @Query() name?: string,
    @Query() limit: number = 20
  ): Promise<Ingredient[]> {
    return this.ingredientsService.find(name, limit);
  }

  /** The fixed list of categories ingredients and pantry items can use */
  @Get("categories")
  public async getCategories(): Promise<Category[]> {
    return [...CATEGORIES];
  }

  /** The fixed list of units ingredients and pantry items can use */
  @Get("units")
  public async getUnits(): Promise<Unit[]> {
    return [...UNITS];
  }

  @Get("{ingredientId}")
  public async getIngredient(@Path() ingredientId: string): Promise<Ingredient> {
    return this.ingredientsService.get(ingredientId);
  }
}
