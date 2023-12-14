/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { locations_address } from './locations_address';
import type { locations_departmentAtLocation } from './locations_departmentAtLocation';
import type { locations_geoLocation } from './locations_geoLocation';
import type { locations_locationHours } from './locations_locationHours';

export type locations_location = {
    address?: locations_address;
    /**
     * The name of the chain.
     */
    chain?: string;
    /**
     * The phone number of the location.
     */
    phone?: string;
    /**
     * The available departments at the location.
     */
    departments?: Array<locations_departmentAtLocation>;
    geolocation?: locations_geoLocation;
    hours?: locations_locationHours;
    /**
     * The 3-digit management division number followed by the 5-digit store number.
     */
    locationId?: string;
    /**
     * The 5-digit store number.
     */
    storeNumber?: string;
    /**
     * The 3-digit management division number.
     */
    divisionNumber?: string;
    /**
     * The name of the location. The name generally consists of the chain followed by a vanity name.
     */
    name?: string;
};

