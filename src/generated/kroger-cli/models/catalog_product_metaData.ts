/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { catalog_product_metaData_package } from './catalog_product_metaData_package';

export type catalog_product_metaData = {
    /**
     * Product availability. (DELIVERY only)
     */
    availability?: boolean;
    /**
     * Flag denoting if the product is alcoholic.
     */
    alcoholic?: boolean;
    /**
     * Product feeAmt. (DELIVERY only)
     */
    feeAmt?: string;
    package?: catalog_product_metaData_package;
    /**
     * Product quantity.
     */
    size?: string;
    /**
     * Flag denoting if the product is wine or spirits. (DELIVERY only)
     */
    wineOrSpirits?: boolean;
    /**
     * Product gtin14. (SHIP, PICK_UP, and IN_STORE only)
     */
    gtin14?: string;
    /**
     * Product nutritional preferences. (SHIP, PICK_UP, and IN_STORE only)
     */
    nutrition?: Array<'GLUTEN_FREE' | 'LIVE_NATURALLY' | 'ORGANIC' | 'NON_GMO'>;
    /**
     * Indicates if an item is eligible for Supplemental Nutrition Assistance Program (SNAP) or not. (SHIP, PICK_UP, and IN_STORE only)
     */
    snapEligible?: boolean;
    /**
     * Indicates if an item has got any restrictions or not. (SHIP, PICK_UP, and IN_STORE only).
     */
    restricted?: boolean;
};

