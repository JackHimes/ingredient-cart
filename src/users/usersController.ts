import {
    Body,
    Controller,
    Get,
    Middlewares,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
    Request
  } from "tsoa";
  import { User, UserCreationParams, UserQueryParams } from "./user";
  import { UsersService } from "./usersService";
  import verifyToken from "../middleware/verifyKrogerToken";

  @Route("users")
  export class UsersController extends Controller {

    @Get()
    public async findUsers(@Query() email?: string): Promise<User[]> {
      let query: UserQueryParams = {};
      if (email) {
        query['email'] = email;
      }
      const usersService = new UsersService
      return await usersService.find(query);
    }

    @Middlewares(verifyToken)
    @Get("{userId}")
    public async getUser(
      @Request() req: Express.Request,
      @Path() userId: string,
      @Query() name?: string,
    ): Promise<User> {
      const token = (req as any).token;
      console.log(token);
      
      return new UsersService().get(userId, name);
    }
  
    @SuccessResponse("201", "Created")
    @Post()
    public async createUser(
      @Body() requestBody: UserCreationParams
    ): Promise<void> {
      this.setStatus(201);
      new UsersService().create(requestBody);
      return;
    }
  }