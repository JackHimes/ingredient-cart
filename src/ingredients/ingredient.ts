import { ObjectId } from "mongodb";

// The single source of truth for categories. Shown in the UI in this order; the Category type is derived from it.
export const CATEGORIES = [
  "Produce",
  "Meat & Seafood",
  "Dairy & Eggs",
  "Bakery",
  "Baking",
  "Grains & Pasta",
  "Canned & Jarred",
  "Spices & Seasonings",
  "Condiments & Sauces",
  "Snacks",
  "Beverages",
  "Frozen",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

// The single source of truth for units. Shown in the UI in this order (counts, then weight, then volume); the Unit type is derived from it.
export const UNITS = [
  "each",
  "dozen",
  "can",
  "jar",
  "bottle",
  "box",
  "bag",
  "package",
  "bunch",
  "clove",
  "stick",
  "slice",
  "oz",
  "lb",
  "g",
  "kg",
  "tsp",
  "tbsp",
  "cup",
  "fl oz",
  "pint",
  "quart",
  "gallon",
  "ml",
  "l",
] as const;

export type Unit = (typeof UNITS)[number];

// "curated" entries are maintained by us, "user" entries were created when someone added an unknown name
export type IngredientSource = "curated" | "user";

// Shared catalog entry. Pantries store their own copy of these so each user can manage theirs.
export interface Ingredient {
  _id: ObjectId;
  name: string;
  /** Lowercased, trimmed, single-spaced name. Unique, used for matching and searching. */
  normalizedName: string;
  unit?: Unit;
  category?: Category;
  source: IngredientSource;
  createdAt: Date;
  updatedAt: Date;
}

export type IngredientCreationParams = Pick<Ingredient, "name" | "unit" | "category">;
