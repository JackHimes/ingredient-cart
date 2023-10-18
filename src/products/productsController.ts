import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
  } from "tsoa";
  import { Product } from "./product";
  import { ProductsService, ProductCreationParams } from "./productsService";
  
  @Route("products")
  export class ProductsController extends Controller {
    @Get("{productId}")
    public async getProduct(
      @Path() productId: number,
      @Query() name?: string
    ): Promise<Product> {
      return new ProductsService().get(productId, name);
    }
  
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createProduct(
      @Body() requestBody: ProductCreationParams
    ): Promise<void> {
      this.setStatus(201); // set return status 201
      new ProductsService().create(requestBody);
      return;
    }
  }