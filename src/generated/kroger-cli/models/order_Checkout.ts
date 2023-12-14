/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { order_Summary } from './order_Summary';
import type { order_Window } from './order_Window';

export type order_Checkout = {
    /**
     * Partner unique identifier for the checkout.
     */
    id: string;
    /**
     * ModalityType of checkout. SHIP is currently the only supported value.
     */
    modalityType: order_Checkout.modalityType;
    /**
     * The version of the checkout
     */
    versionKey: string;
    created: order_Window;
    modified: order_Window;
    /**
     * Order status.
     */
    status: order_Checkout.status;
    summary: order_Summary;
    /**
     * Any additional details related to an order can be provided here.
     */
    additionalInfo?: Record<string, any>;
};

export namespace order_Checkout {

    /**
     * ModalityType of checkout. SHIP is currently the only supported value.
     */
    export enum modalityType {
        SHIP = 'SHIP',
    }

    /**
     * Order status.
     */
    export enum status {
        DRAFT = 'DRAFT',
        ACTIVE = 'ACTIVE',
        CANCELED = 'CANCELED',
    }


}

