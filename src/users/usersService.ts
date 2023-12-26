import { ObjectId } from "mongodb";
import { ApiService } from "../services/apiService";
import { User, UserCreationParams, UserQueryParams, UserUpdateParams } from "./user";
import { hash } from "bcrypt";
import  ApiError  from "../lib/ApiError";


export class UsersService extends ApiService {
  constructor() {
    super();
  }

  public async find(query: UserQueryParams): Promise<User[]> {
    let users = await this.db.collection("users").find(query).toArray();

    return users as unknown as User[];
  }

  public async get(id: string, name?: string): Promise<User> {
    let query: UserQueryParams = { _id: new ObjectId(id) };
    if (name) {
      query = { ...query, name: name };
    }

    let result = (await this.db
      .collection("users")
      .findOne(query)) as unknown as User;

    return result;
  }

  public async create(userCreationParams: UserCreationParams): Promise<User> {
    let user = (await this.db.collection("users").findOne({ email: userCreationParams.email }))

    if(!user){
      userCreationParams.password = await hash(userCreationParams.password as string, 10);

      await this.db.collection("users").insertOne({
        ...userCreationParams,
        verified: false
      });
      return {
        ...userCreationParams,
        verified: false
      } as User;
    } else {
      throw new ApiError("DuplicateEmail", 400, "Email Already Exists")
    }
  }

  public async update(
    id: string,
    userUpdateParams: UserUpdateParams
  ): Promise<void> {
    if (userUpdateParams.password) {
      userUpdateParams.password = await hash(userUpdateParams.password, 10);
    }

    await this.db
    .collection("users")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...userUpdateParams } });

    return;
  }

  public async delete(id: string): Promise<void> {
    await this.db.collection("users").deleteOne({ id: new ObjectId(id) });
    
    return
  }
}