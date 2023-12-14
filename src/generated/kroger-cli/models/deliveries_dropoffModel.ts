/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { deliveries_addressModel } from './deliveries_addressModel';
import type { deliveries_personContactModel } from './deliveries_personContactModel';

/**
 * Drop-off information.
 */
export type deliveries_dropoffModel = {
    contact?: deliveries_personContactModel;
    address?: deliveries_addressModel;
    /**
     * Indicates if a signature required for the delivery.
     */
    signatureRequired?: boolean;
    /**
     * Any special instructions for the drop-off.
     */
    specialInstructions?: string;
};

