/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { products_productImageSizeModel } from './products_productImageSizeModel';

/**
 * Information about the product's image.
 */
export type products_productImageModel = {
    /**
     * An optional identifier of the image size.
     */
    id?: string;
    /**
     * A description of the product image view.
     */
    perspective?: string;
    default?: boolean;
    /**
     * An array of image sizes.
     */
    sizes?: Array<products_productImageSizeModel>;
};

