/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { catalog_v2_image } from './catalog_v2_image';
import type { catalog_v2_products_brand } from './catalog_v2_products_brand';
import type { catalog_v2_products_categories } from './catalog_v2_products_categories';
import type { catalog_v2_products_metadata } from './catalog_v2_products_metadata';

export type catalog_v2_products = {
    /**
     * Product identifier, usually an UPC/GTIN.
     */
    upc?: string;
    /**
     * Product name.
     */
    name?: string;
    /**
     * Product description.
     */
    description?: string;
    /**
     * Product last updated timestamp.
     */
    updatedAt?: {
        value?: string;
        timezone?: string;
    };
    brand?: catalog_v2_products_brand;
    categories?: catalog_v2_products_categories;
    metadata?: catalog_v2_products_metadata;
    /**
     * Product images.
     */
    images?: catalog_v2_image;
};

