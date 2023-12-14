/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { catalog_v2_products_locations_inventory_prices_price_nFor } from './catalog_v2_products_locations_inventory_prices_price_nFor';

/**
 * Pricing details for the product.
 */
export type catalog_v2_products_locations_inventory_prices_price = {
    /**
     * Unit price of product
     */
    unit?: string;
    /**
     * Product price description
     */
    description?: string;
    nFor?: catalog_v2_products_locations_inventory_prices_price_nFor;
    /**
     * Sold by unit or weight.
     */
    soldBy?: catalog_v2_products_locations_inventory_prices_price.soldBy;
    /**
     * Product price type effective date. If there's a promo price, the effective date is associated with it; otherwise, it's associated with the regular price.
     */
    effectiveDate?: {
        value?: string;
        timezone?: string;
    };
    /**
     * Product price type expired date. If there's a promo price, the expired date is associated with it; otherwise, it's associated with the regular price.
     */
    expiredDate?: {
        value?: string;
        timezone?: string;
    };
};

export namespace catalog_v2_products_locations_inventory_prices_price {

    /**
     * Sold by unit or weight.
     */
    export enum soldBy {
        UNIT = 'UNIT',
        WEIGHT = 'WEIGHT',
    }


}

