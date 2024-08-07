import { ObjectId } from "mongodb";
import { ApiService } from "../services/apiService";
import {
  User,
  UserCreationParams,
  UserQueryParams,
  UserUpdateParams,
  RecentRecipe
} from "../types/sharedTypes";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import ApiError from "../lib/ApiError";

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
      query = { ...query, fullName: name };
    }

    let result = (await this.db
      .collection("users")
      .findOne(query)) as unknown as User;

    return result;
  }

  public async getTokenByEmail(email: string): Promise<string | null> {
    const user: User = (await this.db
      .collection("users")
      .findOne({ email: email })) as unknown as User;

    if (!user) {
      console.error("User not found");
      return null;
    }

    const accessToken = user.krogerAccessToken;

    if (!accessToken) {
      console.error("No token found for user");
      return null;
    }

    const decodedToken = jwt.decode(accessToken) as { exp: number };
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      console.log("Token has expired, refreshing...");
      try {
        const refreshedToken = await this.refreshAccessToken(
          user.krogerRefreshToken!
        );
        await this.updateUserToken(user.email, {
          access_token: refreshedToken.access_token,
          refresh_token: refreshedToken.refresh_token,
        });
        return refreshedToken.access_token;
      } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
      }
    } else {
      console.log("Token is valid");
      return accessToken;
    }
  }

  private async refreshAccessToken(refreshToken: string): Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
  }> {
    try {
      const clientSecret = process.env.KROGER_API_TOKEN!;

      const response = await axios.post(
        "https://api.kroger.com/v1/connect/oauth2/token",
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${clientSecret}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  }

  public async updateUserToken(
    email: string,
    tokenData: { access_token: string; refresh_token: string }
  ) {
    await this.db.collection("users").updateOne(
      { email: email },
      {
        $set: {
          krogerAccessToken: tokenData.access_token,
          krogerRefreshToken: tokenData.refresh_token,
        },
      }
    );
  }

  public async create(userCreationParams: UserCreationParams): Promise<User> {
    // Validate required fields
    if (!userCreationParams.email) {
      throw new ApiError("ValidationError", 400, "Email is required");
    }
    if (!userCreationParams.fullName) {
      throw new ApiError("ValidationError", 400, "Full name is required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userCreationParams.email)) {
      throw new ApiError("ValidationError", 400, "Invalid email format");
    }

    let existingUser = await this.db
      .collection("users")
      .findOne({ email: userCreationParams.email });

    if (!existingUser) {
      const newUser: UserCreationParams = {
        ...userCreationParams,
        verified: userCreationParams.verified ?? false,
        favoriteRecipes: userCreationParams.favoriteRecipes ?? [],
        recentRecipes: userCreationParams.recentRecipes ?? []
      };

      console.log("Inserting new user:", JSON.stringify(newUser, null, 2));
      const result = await this.db.collection("users").insertOne(newUser);
      console.log("Insert result:", JSON.stringify(result, null, 2));
      return { ...newUser, _id: result.insertedId } as User;
    } else {
      throw new ApiError("DuplicateEmail", 400, "Email Already Exists");
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

    return;
  }

  public async addFavoriteRecipe(userEmail: string, recipeId: string): Promise<void> {
    await this.db.collection("users").updateOne(
      { email: userEmail },
      { $addToSet: { favoriteRecipes: new ObjectId(recipeId) } }
    );
  }

  public async removeFavoriteRecipe(userEmail: string, recipeId: string): Promise<void> {
    await this.db.collection("users").updateOne(
      { email: userEmail },
      { $pull: { favoriteRecipes: new ObjectId(recipeId) } }
    );
  }

  public async getFavoriteRecipes(userEmail: string): Promise<string[]> {
    const user = await this.db.collection("users").findOne({ email: userEmail });
    if (user && Array.isArray(user.favoriteRecipes)) {
      return user.favoriteRecipes.map((id: ObjectId) => id.toHexString());
    }
    return [];
  }

  public async isFavoriteRecipe(userEmail: string, recipeId: string): Promise<boolean> {
    const user = await this.db.collection("users").findOne({
      email: userEmail,
      favoriteRecipes: new ObjectId(recipeId)
    });
    return !!user;
  }

  public async addRecentRecipe(userEmail: string, recipeId: string): Promise<void> {
    const newRecent: RecentRecipe = { recipeId: new ObjectId(recipeId), viewedAt: new Date() };
    
    await this.db.collection("users").updateOne(
      { email: userEmail },
      [
        { 
          $set: { 
            recentRecipes: {
              $cond: {
                if: { $in: [new ObjectId(recipeId), "$recentRecipes.recipeId"] },
                then: {
                  $concatArrays: [
                    [newRecent],
                    {
                      $filter: {
                        input: "$recentRecipes",
                        cond: { $ne: ["$$this.recipeId", new ObjectId(recipeId)] }
                      }
                    }
                  ]
                },
                else: {
                  $slice: [
                    { $concatArrays: [[newRecent], "$recentRecipes"] },
                    10
                  ]
                }
              }
            }
          }
        }
      ]
    );
  }

  public async getRecentRecipes(userEmail: string): Promise<{ recipeId: string; viewedAt: Date }[]> {
    const user = await this.db.collection("users").findOne({ email: userEmail });
    return user?.recentRecipes?.map((recent: RecentRecipe) => ({
      recipeId: recent.recipeId.toHexString(),
      viewedAt: recent.viewedAt
    })) || [];
  }
}
