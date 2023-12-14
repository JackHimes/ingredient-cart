/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { catalog_brandModel } from './catalog_brandModel';
import type { catalog_categoryModel } from './catalog_categoryModel';
import type { catalog_image } from './catalog_image';
import type { catalog_postalCodes } from './catalog_postalCodes';
import type { catalog_product_barcode } from './catalog_product_barcode';
import type { catalog_product_metaData } from './catalog_product_metaData';
import type { catalog_product_storeInfo } from './catalog_product_storeInfo';

export type catalog_productModel = {
    /**
     * Product name.
     */
    name?: string;
    /**
     * Slug is the part of a URL that identifies a product in human-readable keywords.
     */
    slug?: string;
    /**
     * Product description.
     */
    description?: string;
    /**
     * Product barcodes.
     */
    barcodes?: catalog_product_barcode;
    brand?: catalog_brandModel;
    /**
     * Product primary category.
     */
    primaryCategory?: {
        /**
         * Primary category identifier. (DELIVERY only)
         */
        id?: number;
        /**
         * Primary category name.
         */
        name?: string;
        /**
         * Slug is the part of a URL that identifies a category in human-readable keywords. (DELIVERY only)
         */
        slug?: string;
        /**
         * Primary category description. (DELIVERY only)
         */
        description?: string;
        /**
         * Parent category.
         */
        parentCategory?: catalog_categoryModel;
        /**
         * Primary category images. (DELIVERY only)
         */
        images?: catalog_image;
        /**
         * Primary category status. (DELIVERY only)
         */
        status?: catalog_productModel.status;
        metaData?: {
            /**
             * Kroger's internal category code. (SHIP, PICK_UP, and IN_STORE only)
             */
            code?: string;
        };
    };
    /**
     * Product secondary categories.
     */
    secondaryCategories?: Array<catalog_categoryModel>;
    storeSpecificData?: catalog_product_storeInfo;
    /**
     * List of postal codes
     */
    postalCodes?: catalog_postalCodes;
    /**
     * Sold by each or weight.
     */
    soldBy?: catalog_productModel.soldBy;
    /**
     * Product images.
     */
    images?: catalog_image;
    /**
     * Kroger's product identifier, usually a GTIN or UPC.
     */
    krogerId?: string;
    /**
     * Product availability.
     */
    status?: catalog_productModel.status;
    /**
     * Product creation timestamp. (DELIVERY only)
     */
    createdAt?: {
        value?: string;
        timezone?: string;
    };
    /**
     * Product last updated timestamp. (DELIVERY only)
     */
    updatedAt?: {
        value?: string;
        timezone?: string;
    };
    /**
     * Product deletion timestamp.
     */
    deletedAt?: {
        value?: string;
        timezone?: string;
    };
    metadata?: catalog_product_metaData;
};

export namespace catalog_productModel {

    /**
     * Primary category status. (DELIVERY only)
     */
    export enum status {
        ENABLED = 'ENABLED',
        DISABLED = 'DISABLED',
    }

    /**
     * Sold by each or weight.
     */
    export enum soldBy {
        EACH = 'EACH',
        WEIGHT = 'WEIGHT',
    }


}

