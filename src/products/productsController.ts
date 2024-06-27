import {
    Body,
    Controller,
    Get,
    Header,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
  } from "tsoa";
  import { Product } from "./product";
  import { ProductsService, ProductCreationParams } from "./productsService";
  import axios from 'axios';

  
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
    @Post("getItemsUpcs")
    public async getItemsUpcs(
      @Body() items: string[],
      @Header("Authorization") authorization?: string
    ): Promise<any> {

      const upcsArray: {
        item: string;
        upc: string;
        description: string;
        thumbnailUrl?: string;
        size?: string;
      }[][] = [];
  
      try {
        for (const item of items) {
          let processedItem = item;
          if (item.split(" ").length > 8) {
            processedItem = item.split(" ").slice(0, 8).join(" ");
          }

          const url = `https://api.kroger.com/v1/products?filter.term=${processedItem}`;
  
          const storedToken = authorization?.split(" ")[1];
          if (!storedToken) {
            this.setStatus(500); 
            throw new Error("Undefined Token");
          }
  
          const response = await axios.get(url, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
          });
  
          if (response.data.data.length > 0) {
            const upcs = response.data.data.slice(0, 5).map((data: any) => {
              const thumbnailImage = data.images.find(
                (image: any) => image.perspective === "front"
              );
              const thumbnailUrl = thumbnailImage
                ? thumbnailImage.sizes[3].url
                : undefined;
              const size = data.items.length > 0 ? data.items[0].size : undefined;
  
              return {
                item: processedItem,
                upc: data.upc,
                description: data.description,
                size: size,
                thumbnailUrl: thumbnailUrl,
              };
            });
  
            upcsArray.push(upcs);
          }
        }
        return upcsArray;
      } catch (error) {
        this.setStatus(500);
        throw new Error('Error searching items');
      }
    }
  }