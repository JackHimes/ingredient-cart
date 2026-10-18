import {
  //Body,
  Controller,
  Get,
  Header,
  // Path,
  //Post,
  Query,
  Route,
} from "tsoa";
import { Location } from "./location";
import { LocationsService } from "./locationsService";
import ApiError from "../lib/ApiError";

@Route("locations")
export class LocationsController extends Controller {
  @Get()
  public async getLocations(
    @Query() zipCode: string | number,
    @Header("Authorization") authorization?: string
  ): Promise<Location[]> {
    const token = authorization?.split(" ")[1];
    if (!token) {
      throw new ApiError("Unauthorized", 401, "Authorization token is missing");
    }
    return new LocationsService().getLocations(zipCode, token);
  }

  @Get("{id}")
  public async getLocation(
    id: string
  ): Promise<Location | null > {
    return new LocationsService().getLocation(id);
  }
}