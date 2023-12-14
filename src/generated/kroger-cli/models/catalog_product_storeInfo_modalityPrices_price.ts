/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type catalog_product_storeInfo_modalityPrices_price = {
    /**
     * Product unit price.
     */
    unitPrice?: string;
    /**
     * Product nFor price.
     */
    nForPrice?: string;
    /**
     * Product nfor.
     */
    nfor?: number;
    /**
     * Product price type.
     */
    type?: catalog_product_storeInfo_modalityPrices_price.type;
    /**
     * Product price type description.
     */
    description?: string;
    /**
     * Product price type expired date.
     */
    expiredDate?: {
        value?: string;
        timezone?: string;
    };
};

export namespace catalog_product_storeInfo_modalityPrices_price {

    /**
     * Product price type.
     */
    export enum type {
        PROMO = 'PROMO',
        REGULAR = 'REGULAR',
    }


}

