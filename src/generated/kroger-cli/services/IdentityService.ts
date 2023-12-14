/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { identity_profileLoyaltyResponseModel } from '../models/identity_profileLoyaltyResponseModel';
import type { identity_profileModel } from '../models/identity_profileModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class IdentityService {

    /**
     * Profile information
     * Provides access to an authenticated customer's profile information.
     * <br><br> **Note**: the customer must be authenticated using the OAuth2 Authorization
     * Code grant type.
     *
     * @returns identity_profileModel OK
     * @throws ApiError
     */
    public static profileGet(): CancelablePromise<identity_profileModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/identity/profile',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Profile query
     * Determine if a customer's profile exists by using their email address.
     * @param email The customer's email address.
     * @returns void
     * @throws ApiError
     */
    public static profileExists(
        email: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/identity/profile',
            query: {
                'email': email,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Profile loyalty information
     * Provides access to an authenticated customer's loyalty information.
     * <br><br> **Note**: the customer must be authenticated using the OAuth2 Authorization
     * Code grant type.
     *
     * @returns identity_profileLoyaltyResponseModel OK
     * @throws ApiError
     */
    public static profileLoyaltyGet(): CancelablePromise<identity_profileLoyaltyResponseModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/identity/profile/loyalty',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Profile query
     * Determine if a customer's profile exists by using their
     * email address.
     *
     * @param email The customer's email address.
     * @returns void
     * @throws ApiError
     */
    public static profileInvokeExists(
        email: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/identity/profile/invoke/exists',
            query: {
                'email': email,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

}
