import { Product } from "./product";

// A post request should not contain an id.
export type ProductCreationParams = Pick<Product, "name" >;

export class ProductsService {
  public get(id: number, name?: string): Product {
    return {
      id,
      name: name ?? "Apple",
    };
  }

  public create(productCreationParams: ProductCreationParams): Product {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      ...productCreationParams,
    };
  }
}