import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  email: string;
  fullName?: string;
  password?: string;
  verified?: boolean;
  phoneNumbers?: string[];
  krogerAccessToken?: string;
  krogerRefreshToken?: string;
};

export type UserCreationParams = Omit<User, "_id">;
export type UserUpdateParams = Partial<User>;
export type UserQueryParams = Partial<User>;
