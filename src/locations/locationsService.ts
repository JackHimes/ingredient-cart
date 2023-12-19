import { Location } from "./location";
import axios, { AxiosResponse } from "axios";
import { ObjectId } from "mongodb";
import { ApiService } from "../services/apiService";


export type LocationCreationParams = Pick<Location, "name" >;
export type LocationParams = {
  'filter.zipCode.near'?: string | number
}

export class LocationsService extends ApiService {
  constructor() {
    super();
  }

  public async getLocations(zipCode?: string | number): Promise<Location[]> {
    let params: LocationParams = {}
    if (zipCode) {
      params['filter.zipCode.near'] = zipCode;
    }
    let response = await axios.get<AxiosResponse<Location[]>>(
      `https://api.kroger.com/v1/locations`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJpbmdyZWRpZW50Y2FydC02MTc1NGI3YmRhMGJlZTE3NGRlNWVjN2M0NmU1MzUxYzY5Njk0Njg2MDAwNzMyNjM5MDAiLCJleHAiOjE2OTgwODIwODcsImlhdCI6MTY5ODA4MDI4MiwiaXNzIjoiYXBpLmtyb2dlci5jb20iLCJzdWIiOiIwNmY5OWYwMi1jMTk4LTVmZTktOTQ5OC0yMDhkZTMxMDAzOWUiLCJzY29wZSI6InByb2R1Y3QuY29tcGFjdCIsImF1dGhBdCI6MTY5ODA4MDI4NzAyMTY5MDY5NiwiYXpwIjoiaW5ncmVkaWVudGNhcnQtNjE3NTRiN2JkYTBiZWUxNzRkZTVlYzdjNDZlNTM1MWM2OTY5NDY4NjAwMDczMjYzOTAwIn0.R-DMV44QaMzMBaM77N5LrFLrXzOv5ILgkYF0pUgisLRi1DnKXcrOzWy34I9iP4SfEk7nKGBDkC4sPMiNYKw6VlQ5fkFhTUfrrxGYXGXNJDpF2f1vFZzC1tQEcsuuiFLLHOP_LRQPPVQ1e3usReB6M2aCaFyI7o4SALq6yAVwaN-Wxnz0_oYab4kZrld1PpmRTmAGt8BLtJb875DkYFTBQIr19tZPpGBDW_kvaPoHfDrnuCCn6JbUtJI9lx7-p_7Wm_HxcwkkC57qam4j7pQKiYGv1v4NoEvs3wJlEXzQ8P0HOFt55V4Q_rVPOengoSV2AXr99kYj85C0cxdAMMobvg",
        },
        params: params
      }
    );

    return response.data.data;
  }
 
  public async getLocation(id: string): Promise<Location | null> {

    let location: any = await this.db.collection("locations").findOne({_id: new ObjectId(id)});

    return location ? location as Location : null;
  }

  // public create(locationCreationParams: LocationCreationParams): Location {
  //   return {
  //     id: Math.floor(Math.random() * 10000), // Random
  //     ...locationCreationParams,
  //   };
  // }
}