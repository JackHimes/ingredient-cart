/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { catalog_v2_products_locations } from './catalog_v2_products_locations';

export type catalog_v2_products_inventory = {
    /**
     * Product identifier, usually an UPC/GTIN.
     */
    upc?: string;
    /**
     * Product name.
     */
    name?: string;
    locations?: catalog_v2_products_locations;
    /**
     * Product stocklevel last updated timestamp.
     */
    stockLevelUpdatedAt?: {
        value?: string;
        timezone?: string;
    };
    /**
     * Product fulfillment last updated timestamp.
     */
    fulfillmentUpdatedAt?: {
        value?: string;
        timezone?: string;
    };
    /**
     * Product price last updated timestamp.
     */
    priceUpdatedAt?: {
        value?: string;
        timezone?: string;
    };
    /**
     * Product stock or stocklevel or fulfillment last updated timestamp.
     */
    updatedAt?: {
        value?: string;
        timezone?: string;
    };
};

