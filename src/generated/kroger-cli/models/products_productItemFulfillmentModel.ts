/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type products_productItemFulfillmentModel = {
    /**
     * Indicates if the product is available for curbside pickup.
     */
    curbside?: boolean;
    /**
     * Indicates if the product is available for home delivery.
     */
    delivery?: boolean;
    /**
     * Indicates if the product is available in store. This does not indicate that the item is in stock.
     */
    instore?: boolean;
    /**
     * Indicates if the product is available to be shipped from a fulfillment center.
     */
    shiptohome?: boolean;
};

