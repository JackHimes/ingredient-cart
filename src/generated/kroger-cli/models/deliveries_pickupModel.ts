/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { deliveries_addressModel } from './deliveries_addressModel';
import type { deliveries_businessContactModel } from './deliveries_businessContactModel';

/**
 * Pick-up information.
 */
export type deliveries_pickupModel = {
    contact?: deliveries_businessContactModel;
    address?: deliveries_addressModel;
    /**
     * Any special instructions for the pick-up.
     */
    specialInstructions?: string;
    /**
     * The locationId of the pick-up location.
     */
    locationId?: string;
};

