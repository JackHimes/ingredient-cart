/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { products_productAisleLocationModel } from './products_productAisleLocationModel';
import type { products_productBoxedDimensionsModel } from './products_productBoxedDimensionsModel';
import type { products_productImageModel } from './products_productImageModel';
import type { products_productItemModel } from './products_productItemModel';
import type { products_productTaxonomyModel } from './products_productTaxonomyModel';
import type { products_productTemperatureModel } from './products_productTemperatureModel';

export type products_productModel = {
    /**
     * The UPC of the product.
     */
    productId?: string;
    aisleLocations?: Array<products_productAisleLocationModel>;
    /**
     * The brand name of the product.
     */
    brand?: string;
    /**
     * The category the product belongs to.
     */
    categories?: Array<string>;
    /**
     * The country of origin of the product.
     */
    countryOrigin?: string;
    /**
     * The name of the product.
     */
    description?: string;
    items?: Array<products_productItemModel>;
    itemInformation?: products_productBoxedDimensionsModel;
    temperature?: products_productTemperatureModel;
    images?: Array<products_productImageModel>;
    taxonomies?: Array<products_productTaxonomyModel>;
    /**
     * The UPC of the product.
     */
    upc?: string;
};

