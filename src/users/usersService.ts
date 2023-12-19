import { ApiService } from "../services/apiService";
import { User, UserQueryParams } from "./user";

// A post request should not contain an id.

export class UsersService extends ApiService {
  constructor() {
    super();
  }

  public async find(query: UserQueryParams): Promise<User[]> {
    let users = await this.db.collection("users").find(query).toArray();

    return users as unknown as User[];
  }

  // public get(id: number, name?: string): User {
  //   return {
  //     id,
  //     email: "jane@doe.com",
  //     name: name ?? "Jane Doe",
  //     status: "Happy",
  //     phoneNumbers: [],
  //   };
  // }

  // public create(userCreationParams: UserCreationParams): User {
  //   return {
  //     id: Math.floor(Math.random() * 10000), // Random
  //     status: "Happy",
  //     ...userCreationParams,
  //   };
  // }
}