/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { carts_cartItemPostRequestModel } from '../models/carts_cartItemPostRequestModel';
import type { carts_cartItemPutRequestModel } from '../models/carts_cartItemPutRequestModel';
import type { carts_cartPayloadModel } from '../models/carts_cartPayloadModel';
import type { carts_cartRequestModel } from '../models/carts_cartRequestModel';
import type { carts_cartsPayloadModel } from '../models/carts_cartsPayloadModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CartsService {

    /**
     * User carts list
     * Provides access to return a list of all carts that belong to an authenticated customer.
     * <br><br> **Note**: the customer must be authenticated using the OAuth2 Authorization
     * Code grant type.
     *
     * @returns carts_cartsPayloadModel OK
     * @throws ApiError
     */
    public static getCarts(): CancelablePromise<carts_cartsPayloadModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/carts',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create a cart
     * Provides access to create a new cart for an authenticated customer.
     * <br><br> **Note**: the customer must be authenticated using the OAuth2 Authorization
     * Code grant type.
     *
     * @param requestBody
     * @returns carts_cartsPayloadModel Created
     * @throws ApiError
     */
    public static createCart(
        requestBody?: carts_cartRequestModel,
    ): CancelablePromise<carts_cartsPayloadModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/carts',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Cart by ID
     * Provides access to an authenticated customer's cart by ID.
     * <br><br> **Note**: the customer must be authenticated using the OAuth2 Authorization
     * Code grant type.
     *
     * @param id
     * @returns carts_cartPayloadModel OK
     * @throws ApiError
     */
    public static getCart(
        id: number,
    ): CancelablePromise<carts_cartPayloadModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/carts/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Update cart
     * Provides access to update an authenticated customer's cart by ID. This operation only updates items that are already in a customer's cart.
     * <br><br> **Note**: the customer must be authenticated using the OAuth2 Authorization
     * Code grant type.
     *
     * @param id
     * @param requestBody
     * @returns carts_cartsPayloadModel OK
     * @throws ApiError
     */
    public static putCart(
        id: number,
        requestBody?: carts_cartRequestModel,
    ): CancelablePromise<carts_cartsPayloadModel> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/carts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                409: `Conflict`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Add to cart
     * Provides access to add items to an authenticated customer's cart.
     * <br><br> **Note**: the customer must be authenticated using the OAuth2 Authorization
     * Code grant type.
     *
     * @param id
     * @param requestBody
     * @returns carts_cartsPayloadModel Created
     * @throws ApiError
     */
    public static postCartItem(
        id: string,
        requestBody?: carts_cartItemPostRequestModel,
    ): CancelablePromise<carts_cartsPayloadModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/carts/{id}/items',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                409: `Conflict`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Updates item quantity
     * Provides access to update the quantity of an item in an authenticated customer's cart.
     * <br><br> **Note**: the customer must be authenticated using the OAuth2 Authorization
     * Code grant type.
     *
     * @param id
     * @param upc
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static putCartItem(
        id: string,
        upc: string,
        requestBody?: carts_cartItemPutRequestModel,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/carts/{id}/items/{upc}',
            path: {
                'id': id,
                'upc': upc,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                409: `Conflict`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Delete item
     * Provides access to delete an item from an authenticated customer's cart.
     * <br><br> **Note**: the customer must be authenticated using the OAuth2 Authorization
     * Code grant type.
     *
     * @param id
     * @param upc
     * @returns void
     * @throws ApiError
     */
    public static deleteCartItem(
        id: string,
        upc: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/carts/{id}/items/{upc}',
            path: {
                'id': id,
                'upc': upc,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                409: `Conflict`,
                500: `Internal Server Error`,
            },
        });
    }

}
