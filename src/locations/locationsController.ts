import {
    Body,
    Controller,
    Get,
    // Path,
    Post,
    // Query,
    Route,
    SuccessResponse,
  } from "tsoa";
  import { Location } from "./location";
  import { LocationsService, LocationCreationParams } from "./locationsService";
  import axios, { AxiosResponse } from "axios";

  
  @Route("locations")
  export class LocationsController extends Controller {
    @Get()
    public async getLocation(
      // @Path() locationId: number,
      // @Query() name?: string
      ): Promise<Location> {
        let response: AxiosResponse<Location>;
        try {
          response = await axios.get<Location>(
            `https://api.kroger.com/v1/locations`, {
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJpbmdyZWRpZW50Y2FydC02MTc1NGI3YmRhMGJlZTE3NGRlNWVjN2M0NmU1MzUxYzY5Njk0Njg2MDAwNzMyNjM5MDAiLCJleHAiOjE2OTc3Mjk3NTMsImlhdCI6MTY5NzcyNzk0OCwiaXNzIjoiYXBpLmtyb2dlci5jb20iLCJzdWIiOiIwNmY5OWYwMi1jMTk4LTVmZTktOTQ5OC0yMDhkZTMxMDAzOWUiLCJzY29wZSI6InByb2R1Y3QuY29tcGFjdCIsImF1dGhBdCI6MTY5NzcyNzk1MzUzMDYzOTYyNSwiYXpwIjoiaW5ncmVkaWVudGNhcnQtNjE3NTRiN2JkYTBiZWUxNzRkZTVlYzdjNDZlNTM1MWM2OTY5NDY4NjAwMDczMjYzOTAwIn0.alDXy2ppLqiyebSpJiu0xD5RmN1uMhVjjIBdqT0do9JzqrPmMcXAyRosNCPxWOdK4i3HjxeQBxY6zAI9aR-btsdgmxVqgwqirhocUVdlFZI0IiUCsvBw4Tjhonb0MiH5HueLNWdZObo3_lS5qDLQEGxWvam4wrhdAiP0-vY_uSP6VoZVh_kpST_ekJPIe_HcHEYud3DuxNiwEkZfddSJBIoNjTWOfKQy7jZFm5sx99H2IX4UlgllbscdNOPp26oolXXLoWIEkmZLv6CpdXe_Eielp6Nb683B0gxuvNoXSpv3-xsqu0xem_T5Q6f18uTRePiyFF1B50QamDNqvEm-3A'
              }
            }
            );

            if (response.status !== 200) {
              throw new Error('An error occurred while fetching the location.');
            }

            return response.data;
          } catch (error) {
            console.error(error);
          }
        throw new Error('An error occurred while fetching the location.')
    }
  
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createLocation(
      @Body() requestBody: LocationCreationParams
    ): Promise<void> {
      this.setStatus(201); // set return status 201
      new LocationsService().create(requestBody);
      return;
    }
  }