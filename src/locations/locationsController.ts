import {
  //Body,
  Controller,
  Get,
  // Path,
  //Post,
  // Query,
  Route,
} from "tsoa";
import { Location } from "./location";
import { LocationsService } from "./locationsService";

@Route("locations")
export class LocationsController extends Controller {
  @Get()
  public async getLocations(
    // @Path() locationId: number,
    // @Query() name?: string
  ): Promise<Location[]> {
    return new LocationsService().getLocations();
  }
}