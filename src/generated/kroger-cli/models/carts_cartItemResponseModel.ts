/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type carts_cartItemResponseModel = {
    /**
     * Indicates if substitutes are allow.
     */
    allowSubstitutes?: boolean;
    /**
     * The date the item was added to the cart.
     */
    createdDate?: string;
    /**
     * The quantity of the item.
     */
    quantity?: number;
    /**
     * Any special instructions for the item.
     */
    specialInstructions?: string;
    /**
     * The UPC of the item.
     */
    upc?: string;
    /**
     * The name of the product.
     */
    description?: string;
    /**
     * An optional value representing a modality including: SHIP, DELIVERY, PICKUP.
     */
    modality?: carts_cartItemResponseModel.modality;
};

export namespace carts_cartItemResponseModel {

    /**
     * An optional value representing a modality including: SHIP, DELIVERY, PICKUP.
     */
    export enum modality {
        SHIP = 'SHIP',
        DELIVERY = 'DELIVERY',
        PICKUP = 'PICKUP',
    }


}

