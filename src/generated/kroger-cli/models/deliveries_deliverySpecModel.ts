/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { deliveries_datetimeModel } from './deliveries_datetimeModel';
import type { deliveries_dropoffModel } from './deliveries_dropoffModel';
import type { deliveries_orderItemModel } from './deliveries_orderItemModel';
import type { deliveries_pickupModel } from './deliveries_pickupModel';

/**
 * Static delivery information.
 */
export type deliveries_deliverySpecModel = {
    beginDate?: deliveries_datetimeModel;
    dropoff?: deliveries_dropoffModel;
    endDate?: deliveries_datetimeModel;
    /**
     * Indicated if the delivery includes alcohol.
     */
    includesAlcohol?: boolean;
    /**
     * The delivery order number.
     */
    orderNo?: string;
    /**
     * A list of items associated with the delivery.
     */
    orderItems?: Array<deliveries_orderItemModel>;
    pickup?: deliveries_pickupModel;
};

