/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { locations_chainResponse } from '../models/locations_chainResponse';
import type { locations_chainsResponse } from '../models/locations_chainsResponse';
import type { locations_departmentResponse } from '../models/locations_departmentResponse';
import type { locations_departmentsResponse } from '../models/locations_departmentsResponse';
import type { locations_locationResponse } from '../models/locations_locationResponse';
import type { locations_locationSearchResponse } from '../models/locations_locationSearchResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LocationsService {

    /**
     * Location list
     * Provides access to a list of locations. If the parameter `filter.chain` is not provided, the results include all locations and chains owned by The Kroger Co.<br>You may include one of the following parameters to narrow search results within a geographic area:<br><br> <ul> <li> <code>filter.zipCode.near</code></li> <li> <code>filter.latLong.near</code></li> <li> <code>filter.lat.near</code> and <code>filter.lon.near</code></li> </ul>
     * @param filterZipCodeNear The zip code to use as a starting point for results.
     * @param filterLatLongNear The latitude and longitude to use as a starting point for results.
     * @param filterLatNear The latitude to use as a starting point for results.
     * @param filterLonNear The longitude to use as a starting point for results.
     * @param filterRadiusInMiles The mile radius of results. This will be ignored if you do not use one of the 3 starting point filters (zipCode, latLong, or lat and lon)
     * @param filterLimit The number of results to return.
     * @param filterChain The chain name of the chain. When using this filter, only stores matching the provided chain name are returned.
     * @param filterDepartment The departmentId of the department. Lists must be comma-separated. When using this filter, only stores that have all of the departments provided are returned.
     * @param filterLocationId Comma-separated list of locationIds.
     * @returns locations_locationSearchResponse OK
     * @throws ApiError
     */
    public static searchLocations(
        filterZipCodeNear?: string,
        filterLatLongNear?: string,
        filterLatNear?: string,
        filterLonNear?: string,
        filterRadiusInMiles: number = 10,
        filterLimit: number = 10,
        filterChain?: string,
        filterDepartment?: string,
        filterLocationId?: string,
    ): CancelablePromise<locations_locationSearchResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations',
            query: {
                'filter.zipCode.near': filterZipCodeNear,
                'filter.latLong.near': filterLatLongNear,
                'filter.lat.near': filterLatNear,
                'filter.lon.near': filterLonNear,
                'filter.radiusInMiles': filterRadiusInMiles,
                'filter.limit': filterLimit,
                'filter.chain': filterChain,
                'filter.department': filterDepartment,
                'filter.locationId': filterLocationId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Location details
     * Provides access to the details of a specific location by using the `locationId`.
     * @param locationId The locationId of the store.
     * @returns locations_locationResponse OK
     * @throws ApiError
     */
    public static locationsGetById(
        locationId: string,
    ): CancelablePromise<locations_locationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations/{locationId}',
            path: {
                'locationId': locationId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Location query
     * Determines if a specific location exists by using the `locationId`.
     * @param locationId The locationId of the store.
     * @returns void
     * @throws ApiError
     */
    public static locationsExistsById(
        locationId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/locations/{locationId}',
            path: {
                'locationId': locationId,
            },
            errors: {
                400: `incorrect locationId format`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Chain list
     * Provides access to a list of all chains owned by The Kroger Co.
     * @returns locations_chainsResponse OK
     * @throws ApiError
     */
    public static listChains(): CancelablePromise<locations_chainsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chains',
            errors: {
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Chain details
     * Provides access to the details of a specific chian by using the chain `name`.
     * @param name The name of a chain owned by The Kroger Co. <br><br> **Note**: the chain `name` is returned from the [/chains](#operation/ListChains) endpoint as `name` and from the [/locations](#operation/SearchLocations) endpoint as `chain`.
     * @returns locations_chainResponse OK
     * @throws ApiError
     */
    public static getChain(
        name: string,
    ): CancelablePromise<locations_chainResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chains/{name}',
            path: {
                'name': name,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Chain query
     * Determine if a specific chain exists by using the chain `name`.
     * @param name The name of a chain owned by The Kroger Co. <br><br> **Note**: the chain `name` is returned from the [/chains](#operation/ListChains) endpoint as `name` and from the [/locations](#operation/SearchLocations) endpoint as `chain`.
     * @returns void
     * @throws ApiError
     */
    public static chainExists(
        name: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/chains/{name}',
            path: {
                'name': name,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Department list
     * Provides access to a list of all departments, including departments of chains owned by The Kroger Co.
     * @returns locations_departmentsResponse OK
     * @throws ApiError
     */
    public static listDepartments(): CancelablePromise<locations_departmentsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/departments',
            errors: {
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Department details
     * Provides access to the details of a specific department by using the `departmentId`.
     * @param id The departmentId of the department to return.
     * @returns locations_departmentResponse OK
     * @throws ApiError
     */
    public static getDepartment(
        id: string,
    ): CancelablePromise<locations_departmentResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/departments/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Department query
     * Determine if a specific department exists by using the `departmentId`.
     * @param id The departmentId of the department to return.
     * @returns void
     * @throws ApiError
     */
    public static departmentExists(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/departments/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

}
