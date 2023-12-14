/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { catalog_brand_metaData } from './catalog_brand_metaData';
import type { catalog_image } from './catalog_image';

/**
 * Product brand
 */
export type catalog_brandModel = {
    /**
     * Brand identifier. (DELIVERY only)
     */
    id?: number;
    /**
     * Brand name.
     */
    name?: string;
    /**
     * Slug is the part of a URL that identifies a brand in human-readable keywords.
     */
    slug?: string;
    /**
     * Brand description. (SHIP, PICK_UP, and IN_STORE only)
     */
    description?: string;
    /**
     * Brand images. (DELIVERY only)
     */
    images?: catalog_image;
    /**
     * Brand status. (DELIVERY only)
     */
    status?: catalog_brandModel.status;
    /**
     * Brand logo link. (DELIVERY only)
     */
    logo?: string;
    metaData?: catalog_brand_metaData;
};

export namespace catalog_brandModel {

    /**
     * Brand status. (DELIVERY only)
     */
    export enum status {
        ENABLED = 'ENABLED',
        DISABLED = 'DISABLED',
    }


}

