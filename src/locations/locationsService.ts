import { Location } from "./location";
import axios, { AxiosResponse } from "axios";

export type LocationCreationParams = Pick<Location, "name" >;

export class LocationsService {
  public async getLocations(): Promise<Location[]> {
    let response = await axios.get<AxiosResponse<Location[]>>(
      `https://api.kroger.com/v1/locations`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJpbmdyZWRpZW50Y2FydC02MTc1NGI3YmRhMGJlZTE3NGRlNWVjN2M0NmU1MzUxYzY5Njk0Njg2MDAwNzMyNjM5MDAiLCJleHAiOjE2OTc3NDcxMjYsImlhdCI6MTY5Nzc0NTMyMSwiaXNzIjoiYXBpLmtyb2dlci5jb20iLCJzdWIiOiIwNmY5OWYwMi1jMTk4LTVmZTktOTQ5OC0yMDhkZTMxMDAzOWUiLCJzY29wZSI6InByb2R1Y3QuY29tcGFjdCIsImF1dGhBdCI6MTY5Nzc0NTMyNjk0NDg3MTA2NiwiYXpwIjoiaW5ncmVkaWVudGNhcnQtNjE3NTRiN2JkYTBiZWUxNzRkZTVlYzdjNDZlNTM1MWM2OTY5NDY4NjAwMDczMjYzOTAwIn0.NJtXufZo6MhRjld11MsRoBAfk2oOCKrNf5jQWvnLpQ4Cd5b7oQxe5ZDYNOTV4f2CTq0Ms-NGyj9whwXdwuHzsMQ-r6aEHhBfXHOrt2oqgrK4X6FGLMqNiJftEHs5V8Hh_VZlLoyk3lqAK0jq4SGMd9CHm22QiYWHPpITfFhd4wpNMmDryzgz1QacMOQXS9V3x7j-n_LQUX-oM87gKGtCBppgFzCFDNAoc8YzdEt0GioTMtjU-A2xY7f97_izPjfd9nIgfQjSzWiW3NtUTGZh8BWcd4u8vxDeH5R4K5q7zBAVL7uvDxQ_iP9rfiJeyW3Akpa5XBOCSbWd_la9UnFbsg'
      }
    });

    return response.data.data
  }

  // public create(locationCreationParams: LocationCreationParams): Location {
  //   return {
  //     id: Math.floor(Math.random() * 10000), // Random
  //     ...locationCreationParams,
  //   };
  // }
}