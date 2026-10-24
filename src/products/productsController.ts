import {
  Body,
  BodyProp,
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
import axios from "axios";

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
    @BodyProp() items: string[],
    @BodyProp() locationId: string,
    @Header("Authorization") authorization?: string
  ): Promise<any> {
    const upcsArray: {
      item: string;
      upc: string;
      description: string;
      thumbnailUrl?: string;
      size?: string;
      price?: number;
      promoPrice?: number;
    }[][] = [];

    try {
      const storedToken = authorization?.split(" ")[1];
      if (!storedToken) {
        console.error("Authorization token is missing or invalid");
        this.setStatus(500);
        throw new Error("Undefined Token");
      }

      // Process all items using Promise.all to handle multiple requests in parallel
      await Promise.all(
        items.map(async (item) => {
          console.log(`Processing item: ${item}`);
          
          // Remove parentheses from the search term
          let processedItem = item.replace(/[()]/g, "");

          // Limit the length of the search term to 8 words
          if (processedItem.split(" ").length > 8) {
            processedItem = processedItem.split(" ").slice(0, 8).join(" ");
          }

          console.log(`Searching Kroger for: ${processedItem}`);

          try {
            // Make the API request to Kroger. Fulfillment info is only
            // returned when a locationId is passed.
            const response = await axios.get("https://api.kroger.com/v1/products", {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${storedToken}`,
              },
              params: {
                "filter.term": processedItem,
                "filter.locationId": locationId,
                // Fetch extra so we still have results after the curbside filter
                "filter.limit": 20,
              },
            });

            console.log("API response received:", response.data);

            // Ensure there's data to process
            const curbsideProducts = (response.data.data ?? []).filter(
              (data: any) =>
                data.items?.some((item: any) => item.fulfillment?.curbside)
            );

            if (curbsideProducts.length > 0) {
              const upcs = curbsideProducts.slice(0, 5).map((data: any) => {
                // Handle missing images or sizes
                const thumbnailImage = data.images?.find(
                  (image: any) => image.perspective === "front"
                );
                const thumbnailUrl = thumbnailImage
                  ? thumbnailImage.sizes?.[3]?.url
                  : undefined;
                const curbsideItem = data.items.find(
                  (item: any) => item.fulfillment?.curbside
                );
                const size = curbsideItem?.size || undefined;
                const price = curbsideItem?.price?.regular || undefined;
                // Kroger sends promo: 0 when the item isn't on sale
                const promoPrice = curbsideItem?.price?.promo || undefined;

                return {
                  item: processedItem,
                  upc: data.upc,
                  description: data.description,
                  thumbnailUrl: thumbnailUrl,
                  size: size,
                  price: price,
                  promoPrice: promoPrice,
                };
              });

              upcsArray.push(upcs); // Push the UPC data to the array
            } else {
              console.warn(`No curbside products found for item: ${processedItem}`);
            }
          } catch (error) {
            console.error(`Error fetching item: ${processedItem}`, error);
            throw error; // Rethrow to be caught by the outer catch block
          }
        })
      );

      console.log("Final UPCs array:", upcsArray);
      return upcsArray;
    } catch (error) {
      console.error("Error processing items:", (error as Error).message);
      this.setStatus(500);
      throw new Error("Error searching items");
    }
  }
}