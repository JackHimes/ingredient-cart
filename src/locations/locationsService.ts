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

  public async getLocations(
    zipCode: string | number | undefined,
    token: string
  ): Promise<Location[]> {
    let params: LocationParams = {}
    if (zipCode) {
      params['filter.zipCode.near'] = zipCode;
    }
    let response = await axios.get<AxiosResponse<Location[]>>(
      `https://api.kroger.com/v1/locations`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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