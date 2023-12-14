/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { order_Buyer } from './order_Buyer';
import type { order_Fulfillment } from './order_Fulfillment';
import type { order_LineItems } from './order_LineItems';
import type { order_Payment } from './order_Payment';

export type order_CreateShipOrderRequest = {
    /**
     * ModalityType of checkout. SHIP is currently the only supported value.
     */
    modalityType: order_CreateShipOrderRequest.modalityType;
    /**
     * The unique name of the partner creating the order.
     */
    origin: string;
    buyer?: order_Buyer;
    fulfillment: order_Fulfillment;
    payment: order_Payment;
    lineItems: order_LineItems;
    /**
     * Any additional details related to an order can be provided here.
     */
    additionalInfo?: Record<string, any>;
};

export namespace order_CreateShipOrderRequest {

    /**
     * ModalityType of checkout. SHIP is currently the only supported value.
     */
    export enum modalityType {
        SHIP = 'SHIP',
    }


}

