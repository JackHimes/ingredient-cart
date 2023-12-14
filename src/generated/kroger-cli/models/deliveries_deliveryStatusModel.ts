/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { deliveries_datetimeModel } from './deliveries_datetimeModel';
import type { deliveries_deliveryDriverInformationModel } from './deliveries_deliveryDriverInformationModel';

/**
 * The delivery status contains dynamic delivery information.
 */
export type deliveries_deliveryStatusModel = {
    /**
     * The cancellation reason if delivery was cancelled by a partner.
     */
    cancellationNote?: string;
    /**
     * The name of the delivery partner.
     */
    courierName?: string;
    /**
     * The current delivery status.
     */
    state?: deliveries_deliveryStatusModel.state;
    driver?: deliveries_deliveryDriverInformationModel;
    dropoffEta?: deliveries_datetimeModel;
    pickupEta?: deliveries_datetimeModel;
    /**
     * Delivery tracking URL
     */
    trackingUrl?: string;
};

export namespace deliveries_deliveryStatusModel {

    /**
     * The current delivery status.
     */
    export enum state {
        INITIAL = 'Initial',
        PENDING_CONFIRMATION = 'PendingConfirmation',
        SCHEDULED = 'Scheduled',
        NOT_CONFIRMED = 'NotConfirmed',
        EDITED = 'Edited',
        EDITS_NOT_CONFIRMED = 'EditsNotConfirmed',
        EN_ROUTE_TO_PICKUP = 'EnRouteToPickup',
        AT_PICKUP = 'AtPickup',
        PICKED_UP = 'PickedUp',
        EN_ROUTE_TO_DROPOFF = 'EnRouteToDropoff',
        DELIVERED = 'Delivered',
        UNDELIVERABLE = 'Undeliverable',
        DELETED_BY_KROGER = 'DeletedByKroger',
        CANCELED_BY_KROGER = 'CanceledByKroger',
        CANCELLATION_CONFIRMATION_PENDING = 'CancellationConfirmationPending',
        CANCELLATION_CONFIRMED = 'CancellationConfirmed',
        CANCELED_BY_PARTNER = 'CanceledByPartner',
        NO_COURIER_AVAILABLE = 'NoCourierAvailable',
        ILLEGAL = 'Illegal',
    }


}

