/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type carts_cartItemPostRequestModel = {
    /**
     * The UPC of the item.
     */
    upc: string;
    /**
     * Indicates if substitutes are allow.
     */
    allowSubstitutes?: boolean;
    /**
     * The quantity of the item.
     */
    quantity: number;
    /**
     * Any special instructions for the item.
     */
    specialInstructions?: string;
    /**
     * An optional value representing a modality including: SHIP, DELIVERY, PICKUP.
     */
    modality?: carts_cartItemPostRequestModel.modality;
};

export namespace carts_cartItemPostRequestModel {

    /**
     * An optional value representing a modality including: SHIP, DELIVERY, PICKUP.
     */
    export enum modality {
        SHIP = 'SHIP',
        DELIVERY = 'DELIVERY',
        PICKUP = 'PICKUP',
    }


}

