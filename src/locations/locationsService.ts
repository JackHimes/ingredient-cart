import { Location } from "./location";

export type LocationCreationParams = Pick<Location, "name" >;

export class LocationsService {
  public get(id: number, name?: string): Location {
    return {
      id,
      name: name ?? "New York Kroger",
    };
  }

  public create(locationCreationParams: LocationCreationParams): Location {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      ...locationCreationParams,
    };
  }
}