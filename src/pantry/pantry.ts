import { ObjectId } from "mongodb";
import { Category, Unit } from "../ingredients/ingredient";

// One per user. Items live in their own collection and point back here via pantryId.
export interface Pantry {
  _id: ObjectId;
  /** Clerk user ID of the owner */
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// A user's own copy of a catalog ingredient, stored in the pantryItems collection
export interface PantryIngredient {
  _id: ObjectId;
  pantryId: ObjectId;
  ingredientId: ObjectId;
  name: string;
  /** Lowercased, trimmed, single-spaced name, used for search and sorting */
  normalizedName: string;
  quantity: number;
  unit?: Unit;
  category?: Category;
  createdAt: Date;
  updatedAt: Date;
}

export interface PantryIngredientCreationParams {
  /** Copy from an existing catalog ingredient. If omitted, the catalog entry is looked up (or created) by name. */
  ingredientId?: string;
  name?: string;
  /** @minimum 0 */
  quantity: number;
  unit?: Unit;
  category?: Category;
}

export interface PantryIngredientUpdateParams {
  name?: string;
  /** @minimum 0 */
  quantity?: number;
  unit?: Unit;
  category?: Category;
}

export type PantrySortField = "name" | "quantity" | "createdAt";
export type SortOrder = "asc" | "desc";

export interface PantryIngredientQueryParams {
  search?: string;
  category?: Category;
  addedAfter?: Date;
  sortBy?: PantrySortField;
  order?: SortOrder;
}
