/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A brief summary of the checkout information.
 */
export type order_Summary = {
    /**
     * The total number of items in the checkout.
     */
    itemCount: number;
    /**
     * Summary of costs associated with the checkout.
     */
    total: {
        /**
         * The sum of all of the line item regular (white tag) prices.
         */
        item: string;
        /**
         * The sum of the tax amounts across all items.
         */
        tax: string;
        /**
         * The sum of the fees, such as shipping fee, applied to the order.
         */
        fee: string;
        /**
         * The initial gratuity applied to the order.
         */
        gratuity: string;
        /**
         * The total in its entirety of all items, including associated tax amounts. (item total + tax total + fee total + gratuity - discount total).
         */
        amount: string;
        /**
         * The sum of the discounts applied to items and to the order, in the form of a dollar amount.
         */
        discount: string;
    };
};

