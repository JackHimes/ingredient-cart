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
} from "tsoa";
import {
  User,
  UserCreationParams,
  UserQueryParams,
  UserUpdateParams,
} from "./user";
import { UsersService } from "./usersService";

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
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<void> {
    this.setStatus(201);
    await new UsersService().create(requestBody);
    return;
  }

  @Patch("{userId}")
  public async updateUser(
    @Path() userId: string,
    @Body() body: UserUpdateParams
  ): Promise<void> {
    return await new UsersService().update(userId, body);
  }
}