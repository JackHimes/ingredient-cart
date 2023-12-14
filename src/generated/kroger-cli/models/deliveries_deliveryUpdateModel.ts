/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { deliveries_deliveryUpdatePayloadModel } from './deliveries_deliveryUpdatePayloadModel';

export type deliveries_deliveryUpdateModel = {
    /**
     * Actions to perform on delivery. Based on chosen action, the client needs to provide a different payload. For more details, see the payload model.
     * Possible values:
     * * `CONFIRM` - Confirms that the delivery partner started working on the delivery.
     * * `CONFIRM_EDITING` - Confirms that the delivery partner accepted the latest updates
     * to the previously confirmed delivery. This can happen when the customer
     * changes delivery notes.
     * * `DECLINE` - Declines an assigned delivery. This can happen when the delivery
     * partner has a delivery available to work on, but there are no drivers to perform
     * the delivery.
     * * `EN_ROUTE_TO_PICK_UP` - Indicates that the delivery driver is on the way to pick
     * up the shipment.
     * * `AT_PICKUP` - Indicates that the delivery driver is at the pick up location.
     * * `EN_ROUTE_TO_DROPOFF` - Indicates that the delivery driver is on the way to drop
     * off the shipment.
     * * `DELIVERED` - Indicates that the delivery driver has completed the delivery successfully.
     * * `UNDELIVERABLE` - Indicated that the delivery driver could not successfully completed the delivery.
     * * `CANCEL` - Cancels a previously confirmed delivery. For example, the delivery driver
     * confirmed a delivery but then got stuck in traffic and was not able to complete the
     * delivery in time.
     * * `CONFIRM_CANCELLATION` - Accepts a delivery cancellation initiated by the customer.
     */
    action: deliveries_deliveryUpdateModel.action;
    payload?: deliveries_deliveryUpdatePayloadModel;
};

export namespace deliveries_deliveryUpdateModel {

    /**
     * Actions to perform on delivery. Based on chosen action, the client needs to provide a different payload. For more details, see the payload model.
     * Possible values:
     * * `CONFIRM` - Confirms that the delivery partner started working on the delivery.
     * * `CONFIRM_EDITING` - Confirms that the delivery partner accepted the latest updates
     * to the previously confirmed delivery. This can happen when the customer
     * changes delivery notes.
     * * `DECLINE` - Declines an assigned delivery. This can happen when the delivery
     * partner has a delivery available to work on, but there are no drivers to perform
     * the delivery.
     * * `EN_ROUTE_TO_PICK_UP` - Indicates that the delivery driver is on the way to pick
     * up the shipment.
     * * `AT_PICKUP` - Indicates that the delivery driver is at the pick up location.
     * * `EN_ROUTE_TO_DROPOFF` - Indicates that the delivery driver is on the way to drop
     * off the shipment.
     * * `DELIVERED` - Indicates that the delivery driver has completed the delivery successfully.
     * * `UNDELIVERABLE` - Indicated that the delivery driver could not successfully completed the delivery.
     * * `CANCEL` - Cancels a previously confirmed delivery. For example, the delivery driver
     * confirmed a delivery but then got stuck in traffic and was not able to complete the
     * delivery in time.
     * * `CONFIRM_CANCELLATION` - Accepts a delivery cancellation initiated by the customer.
     */
    export enum action {
        CONFIRM = 'CONFIRM',
        CONFIRM_EDITING = 'CONFIRM_EDITING',
        DECLINE = 'DECLINE',
        EN_ROUTE_TO_PICK_UP = 'EN_ROUTE_TO_PICK_UP',
        AT_PICKUP = 'AT_PICKUP',
        PICK_UP = 'PICK_UP',
        EN_ROUTE_TO_DROPOFF = 'EN_ROUTE_TO_DROPOFF',
        DELIVERED = 'DELIVERED',
        UNDELIVERABLE = 'UNDELIVERABLE',
        CANCEL = 'CANCEL',
        CONFIRM_CANCELLATION = 'CONFIRM_CANCELLATION',
    }


}

