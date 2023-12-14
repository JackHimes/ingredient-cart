/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { deliveries_datetimeModel } from './deliveries_datetimeModel';
import type { deliveries_deliverySpecModel } from './deliveries_deliverySpecModel';
import type { deliveries_deliveryStatusModel } from './deliveries_deliveryStatusModel';

export type deliveries_deliveryModel = {
    createdAt?: deliveries_datetimeModel;
    /**
     * The delivery ID.
     */
    id?: string;
    spec?: deliveries_deliverySpecModel;
    status?: deliveries_deliveryStatusModel;
    modifiedAt?: deliveries_datetimeModel;
};

