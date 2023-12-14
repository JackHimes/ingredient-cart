/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Type of delivery service for the customer.
 */
export type order_Service = {
    /**
     * Type of delivery requested by the customer.
     */
    type?: order_Service.type;
    /**
     * Shipping method.
     */
    code?: order_Service.code;
    /**
     * Shipping fee paid by the customer.
     */
    cost?: string;
};

export namespace order_Service {

    /**
     * Type of delivery requested by the customer.
     */
    export enum type {
        STANDARD = 'STANDARD',
        CONTACTLESS = 'CONTACTLESS',
    }

    /**
     * Shipping method.
     */
    export enum code {
        STANDARD_SHIPPING = 'STANDARD_SHIPPING',
        USPS_PRIORITY_MAIL = 'USPS_PRIORITY_MAIL',
        FED_EX_HOME_DELIVERY = 'FED_EX_HOME_DELIVERY',
        FED_EX_TWO_DAY_AIR = 'FED_EX_TWO_DAY_AIR',
        FED_EX_OVERNIGHT = 'FED_EX_OVERNIGHT',
    }


}

