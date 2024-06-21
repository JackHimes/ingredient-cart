import { ObjectId } from "mongodb";

export interface RecentRecipe {
  recipeId: ObjectId;
  viewedAt: Date;
}

export interface User {
  _id: ObjectId;
  email: string;
  fullName?: string;
  password?: string;
  verified?: boolean;
  phoneNumbers?: string[];
  krogerAccessToken?: string;
  krogerRefreshToken?: string;
  favoriteRecipes: ObjectId[];
  recentRecipes: RecentRecipe[];
}

export type UserCreationParams = Omit<User, "_id">;
export type UserUpdateParams = Partial<User>;
export type UserQueryParams = Partial<User>;