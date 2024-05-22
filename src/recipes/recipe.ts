import { ObjectId } from "mongodb";

export type Recipe = {
    _id: ObjectId;
    title: string;
    ingredients: string[];
    instructions: string[];
    url: string;
    image: string;
  }

  export type RecipeCreationParams = Partial<Recipe>;
  export type RecipeUpdateParams = Partial<Recipe>;
  export type RecipeQueryParams = Partial<Recipe>;