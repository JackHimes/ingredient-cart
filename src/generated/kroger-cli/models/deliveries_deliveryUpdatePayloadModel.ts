/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { deliveries_payload_deliveryDriverInformationModel } from './deliveries_payload_deliveryDriverInformationModel';
import type { deliveries_payload_dropoff } from './deliveries_payload_dropoff';
import type { deliveries_payload_pickup } from './deliveries_payload_pickup';

export type deliveries_deliveryUpdatePayloadModel = {
    /**
     * The reason why the confirmed delivery is being canceled.
     */
    cancellationNote?: string;
    driver?: deliveries_payload_deliveryDriverInformationModel;
    dropoffEta?: deliveries_payload_dropoff;
    pickupEta?: deliveries_payload_pickup;
    /**
     * The URL where the customer can track the delivery in 'real' time. Required when using the `CONFIRM` action.
     */
    trackingUrl?: string;
};

