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
  import { User } from "./user";
  import { UsersService, UserCreationParams } from "./usersService";
  import verifyToken from "../middleware/verifyKrogerToken";

  @Route("users")
  export class UsersController extends Controller {
    @Middlewares(verifyToken)
    @Get("{userId}")
    public async getUser(
      @Request() req: Express.Request,
      @Path() userId: number,
      @Query() name?: string,
    ): Promise<User> {
      const token = (req as any).token;
      console.log(token);
      
      return new UsersService().get(userId, name);
    }
  
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
      @Body() requestBody: UserCreationParams
    ): Promise<void> {
      this.setStatus(201); // set return status 201
      new UsersService().create(requestBody);
      return;
    }
  }