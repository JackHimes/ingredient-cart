import {
    Body,
    Controller,
    Post,
    Route,
    SuccessResponse,
    Header,
  } from "tsoa";
  import axios from 'axios';
  
  interface CartItem {
    upc: string;
    quantity: number;
  }
  
  @Route("cart")
  export class CartController extends Controller {
    @SuccessResponse("200", "Success")
    @Post("add")
    public async addToCart(
      @Body() items: CartItem[],
      @Header("Authorization") authorization?: string
    ): Promise<any> {
      try {
        const storedToken = authorization?.split(" ")[1];
        if (!storedToken) {
          this.setStatus(401);
          throw new Error("Unauthorized: Token is missing");
        }
  
        const payloadItems = items.map((item) => ({
          upc: item.upc,
          quantity: item.quantity,
          modality: "PICKUP",
        }));
  
        const payload = {
          items: payloadItems,
        };
  
        const response = await axios.put(
          "https://api.kroger.com/v1/cart/add",
          payload,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
  
        return response.data;
      } catch (error: any) {
        this.setStatus(500);
        throw new Error(`Error adding to cart: ${error.message}`);
      }
    }
  }