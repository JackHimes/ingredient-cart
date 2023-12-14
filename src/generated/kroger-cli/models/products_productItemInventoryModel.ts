/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type products_productItemInventoryModel = {
    /**
     * Indicates the level of stock.
     */
    stockLevel?: products_productItemInventoryModel.stockLevel;
};

export namespace products_productItemInventoryModel {

    /**
     * Indicates the level of stock.
     */
    export enum stockLevel {
        HIGH = 'HIGH',
        LOW = 'LOW',
        TEMPORARILY_OUT_OF_STOCK = 'TEMPORARILY_OUT_OF_STOCK',
    }


}

