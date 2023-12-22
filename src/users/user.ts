import { ObjectId } from "mongodb";

export type User = {
    _id: ObjectId;
    email: string;
    name: string;
    password: string;
    verified?: boolean;
    phoneNumbers: string[];
    krogerToken?: string;
  }

  export type UserCreationParams = Partial<User>;
  export type UserUpdateParams = Partial<User>;
  export type UserQueryParams = Partial<User>;  