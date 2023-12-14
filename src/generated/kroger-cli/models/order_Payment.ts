/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { order_Address } from './order_Address';

/**
 * Payment details for the order.
 */
export type order_Payment = {
    /**
     * The partner's unique payment identifier for the order.
     */
    id?: string;
    /**
     * Payment status of the order.
     */
    status: order_Payment.status;
    /**
     * Total amount paid for the order. It is in USD XX.XX format. This will be equal to item total + tax + shipping fee - discount.
     */
    amount: string;
    /**
     * Mode of the payment. Currently CREDIT_CARD_PAY is the only value supported.
     */
    type?: order_Payment.type;
    /**
     * Total tax paid on the order. It is in USD XX.XX format.
     */
    tax?: string;
    billingAddress?: order_Address;
};

export namespace order_Payment {

    /**
     * Payment status of the order.
     */
    export enum status {
        PENDING = 'PENDING',
        PARTIALLY_DONE = 'PARTIALLY_DONE',
        COMPLETED = 'COMPLETED',
    }

    /**
     * Mode of the payment. Currently CREDIT_CARD_PAY is the only value supported.
     */
    export enum type {
        CREDIT_CARD_PAY = 'CREDIT_CARD_PAY',
    }


}

