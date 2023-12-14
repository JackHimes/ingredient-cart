/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type carts_cartItemRequestModel = {
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
     * The UPC of the item.
     */
    upc: string;
    /**
     * An optional value representing a modality including: SHIP, DELIVERY, PICKUP.
     */
    modality?: carts_cartItemRequestModel.modality;
};

export namespace carts_cartItemRequestModel {

    /**
     * An optional value representing a modality including: SHIP, DELIVERY, PICKUP.
     */
    export enum modality {
        SHIP = 'SHIP',
        DELIVERY = 'DELIVERY',
        PICKUP = 'PICKUP',
    }


}

