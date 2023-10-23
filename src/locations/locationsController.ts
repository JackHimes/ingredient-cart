import {
  //Body,
  Controller,
  Get,
  // Path,
  //Post,
  Query,
  Route,
} from "tsoa";
import { Location } from "./location";
import { LocationsService } from "./locationsService";

@Route("locations")
export class LocationsController extends Controller {
  @Get()
  public async getLocations(
    @Query() zipCode: string | number,
  ): Promise<Location[]> {
    return new LocationsService().getLocations(zipCode);
  }

  @Get("{id}")
  public async getLocation(
    id: string
  ): Promise<Location | null > {
    return new LocationsService().getLocation(id);
  }
}