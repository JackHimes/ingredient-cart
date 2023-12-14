/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { catalog_v2_products_metadata_package } from './catalog_v2_products_metadata_package';
import type { catalog_v2_products_metadata_temparature } from './catalog_v2_products_metadata_temparature';

export type catalog_v2_products_metadata = {
    package?: catalog_v2_products_metadata_package;
    /**
     * Product quantity.
     */
    size?: string;
    /**
     * Product gtin14.
     */
    gtin14?: string;
    /**
     * Product nutritional preferences.
     */
    nutritionalPreferences?: Array<'GLUTEN_FREE' | 'LIVE_NATURALLY' | 'ORGANIC' | 'NON_GMO'>;
    /**
     * Product's country of origin
     */
    countryOfOrigin?: string;
    temparature?: catalog_v2_products_metadata_temparature;
    /**
     * Indicates if an item is eligible for Supplemental Nutrition Assistance Program (SNAP) or not.
     */
    snapEligible?: boolean;
    /**
     * Indicates if an item is alcoholic
     */
    alcoholic?: boolean;
    /**
     * Indicates if an item has any restriction or not
     */
    restrictedItem?: boolean;
    /**
     * Indicates if an item has age restriction
     */
    ageRestrictionFlag?: boolean;
};

