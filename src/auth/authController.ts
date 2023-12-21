import {
  Body,
  Controller,
  Get,
  Header,
  Patch,
  Route,
} from "tsoa";

import { User } from "../users/user";
import { AuthService } from "./authService";
import { Buffer } from "buffer";
import { UsersService } from "../users/usersService";

@Route("auth")
export class AuthController extends Controller {
  @Get("login")
  public async login(
    @Header("Authorization") authorization: string
  ): Promise<User> {
    const decode = (str: string): string =>
      Buffer.from(str, "base64").toString();
    const [email, password] = decode(authorization.replace("Basic ", "")).split(
      ":"
    );
    return await new AuthService().login(email, password);
  }

  @Patch("verify")
  public async verify(@Body() body: any): Promise<void> {
    let users = await new UsersService().find({ email: body.email });
    let userId = users[0]._id?.toString();
    return await new UsersService().update(userId as string, {
      verified: true,
    });
  }

  @Patch("changePassword")
  public async changePassword(@Body() body: any): Promise<void> {
    let users = await new UsersService().find({ email: body.email });
    let userId = users[0]._id?.toString();
    return await new UsersService().update(userId as string, {
      password: body.password,
    });
  }
}
