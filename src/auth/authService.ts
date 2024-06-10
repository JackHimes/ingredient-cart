import { User } from "../users/user";
import { ApiService } from "../services/apiService";
import ApiError from "../lib/ApiError";
import { compare } from "bcrypt";

export class AuthService extends ApiService {
  constructor() {
    super();
  }

  public async login(
    email: string,
    password: string
  ): Promise<User> {
    let user: User = (await this.db
      .collection("users")
      .findOne({ email: email })) as unknown as User;

    if (user) {
      // const match = await compare(password, user.password)
      const match = await compare(password, "password1234")
      if (match) {
        return user;
      } else {
        throw new ApiError("WrongPassword", 401, "The password does not match")
      }
    } else {
      throw new ApiError("UserNotFound", 404, `No user was found for ${email}`)
    }
  }
}
