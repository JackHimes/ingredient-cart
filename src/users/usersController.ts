import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Patch,
  Delete,
} from "tsoa";
import {
  User,
  UserCreationParams,
  UserQueryParams,
  UserUpdateParams,
} from "./user";
import { UsersService } from "./usersService";
import ApiError from "../lib/ApiError";

@Route("users")
export class UsersController extends Controller {
  @Get("getToken")
  public async getToken(@Query("email") email: string): Promise<string | null> {
    try {
      return await new UsersService().getTokenByEmail(email);
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  @Patch("updateToken")
  public async updateToken(
    @Query("email") email: string,
    @Query("accessToken") accessToken: string,
    @Query("refreshToken") refreshToken: string
  ): Promise<void> {
    return await new UsersService().updateUserToken(email, {
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  @Get()
  public async findUsers(@Query() email?: string): Promise<User[]> {
    let query: UserQueryParams = {};
    if (email) {
      query["email"] = email;
    }
    const usersService = new UsersService();
    return await usersService.find(query);
  }

  @Get("{userId}")
  public async getUser(
    @Path() userId: string,
    @Query() name?: string
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }
  
  @SuccessResponse("201", "Created")
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    try {
      this.setStatus(201);
      await new UsersService().create(requestBody);
    } catch (error) {
      console.error("Error creating user:", error);
      if (error instanceof ApiError) {
        this.setStatus(error.statusCode);
        throw error;
      } else {
        this.setStatus(400);
        throw new ApiError("ValidationError", 400, "Invalid user data");
      }
    }
  }
  

  @Patch("{userId}")
  public async updateUser(
    @Path() userId: string,
    @Body() body: UserUpdateParams
  ): Promise<void> {
    return await new UsersService().update(userId, body);
  }

  @SuccessResponse("201", "Added")
  @Post("{userEmail}/favorites/{recipeId}")
  public async addFavoriteRecipe(
    @Path() userEmail: string,
    @Path() recipeId: string
  ): Promise<void> {
    await new UsersService().addFavoriteRecipe(userEmail, recipeId);
    this.setStatus(201);
  }

  @Delete("{userEmail}/favorites/{recipeId}")
  public async removeFavoriteRecipe(
    @Path() userEmail: string,
    @Path() recipeId: string
  ): Promise<void> {
    await new UsersService().removeFavoriteRecipe(userEmail, recipeId);
  }

  @Get("{userEmail}/favorites")
  public async getFavoriteRecipes(@Path() userEmail: string): Promise<string[]> {
    return new UsersService().getFavoriteRecipes(userEmail);
  }

  @Get("{userEmail}/favorites/{recipeId}")
  public async isFavoriteRecipe(
    @Path() userEmail: string,
    @Path() recipeId: string
  ): Promise<boolean> {
    return new UsersService().isFavoriteRecipe(userEmail, recipeId);
  }

  @SuccessResponse("201", "Added")
  @Post("{userEmail}/recent/{recipeId}")
  public async addRecentRecipe(
    @Path() userEmail: string,
    @Path() recipeId: string
  ): Promise<void> {
    await new UsersService().addRecentRecipe(userEmail, recipeId);
    this.setStatus(201);
  }

  @Get("{userEmail}/recent")
  public async getRecentRecipes(@Path() userEmail: string): Promise<{ recipeId: string; viewedAt: Date }[]> {
    return new UsersService().getRecentRecipes(userEmail);
  }
}