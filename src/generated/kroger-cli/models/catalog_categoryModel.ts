/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { catalog_category_metaData } from './catalog_category_metaData';
import type { catalog_image } from './catalog_image';

export type catalog_categoryModel = {
    /**
     * Category identifier. (DELIVERY only)
     */
    id?: number;
    /**
     * Category name.
     */
    name?: string;
    /**
     * Slug is the part of a URL that identifies a category in human-readable keywords.
     */
    slug?: string;
    /**
     * Category description. (DELIVERY only)
     */
    description?: string;
    /**
     * Category images. (DELIVERY only)
     */
    images?: catalog_image;
    /**
     * Category status. (DELIVERY only)
     */
    status?: catalog_categoryModel.status;
    metaData?: catalog_category_metaData;
};

export namespace catalog_categoryModel {

    /**
     * Category status. (DELIVERY only)
     */
    export enum status {
        ENABLED = 'ENABLED',
        DISABLED = 'DISABLED',
    }


}

