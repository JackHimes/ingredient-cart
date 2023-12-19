import { ObjectId } from "mongodb";

export type User = {
    id: ObjectId;
    email: string;
    name: string;
    status?: "Happy" | "Sad";
    phoneNumbers: string[];
  }

  export type UserCreationParams = Partial<User>;
  export type UserUpdateParams = Partial<User>;
  export type UserQueryParams = Partial<User>;  