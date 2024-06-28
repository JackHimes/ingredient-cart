import { ObjectId } from "mongodb";

export interface Recipe {
  _id: ObjectId;
  title: string;
  ingredients: string[];
  instructions: string[];
  description?: string;
  url?: string;
  image?: string;
  author?: string;
  category?: string;
  cuisine?: string;
  yields?: string;
  total_time?: number;
  createdBy: string;
  popularity: number;
}

export type RecipeCreationParams = Omit<Recipe, "_id" | "popularity">;
export type RecipeUpdateParams = Partial<Recipe>;
export type RecipeQueryParams = Partial<Recipe>;