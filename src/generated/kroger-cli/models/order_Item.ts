/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type order_Item = {
    /**
     * The GTIN-13 for the item. It must contain all 13 digits.
     */
    gtin13: string;
    /**
     * Quantity of the line item.
     */
    quantity: number;
    /**
     * Any notes related to fulfillment, such as allowed replacements or expiration dates.
     */
    instructions?: string;
    /**
     * Original price information of an item.
     */
    originalPrice: {
        /**
         * Regular price for the current item. If this is the only value present, it is the current cost to the customer for a unit of the item.
         */
        regular: {
            /**
             * It is in USD XX.XX format.
             */
            price?: string;
        };
        /**
         * Sale price for the current item. If this is present, this is the current cost to the customer for a unit of the item.
         * The sale price must be less than the regular price.
         */
        sale?: {
            /**
             * It is in USD XX.XX format.
             */
            price?: string;
        };
    };
};

