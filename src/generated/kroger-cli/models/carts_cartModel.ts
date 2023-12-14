/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { carts_cartItemResponseModel } from './carts_cartItemResponseModel';

export type carts_cartModel = {
    /**
     * The ID of the cart.
     */
    id?: string;
    /**
     * The date the cart was created.
     */
    createdDate?: string;
    /**
     * An array of items in the cart.
     */
    items?: Array<carts_cartItemResponseModel>;
    /**
     * The name of the cart.
     */
    name?: string;
};

