/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { order_Contact } from './order_Contact';
import type { order_Service } from './order_Service';

/**
 * Information about the order fulfillment.
 */
export type order_Fulfillment = {
    contact: order_Contact;
    /**
     * Customer note related to order fulfillment.
     */
    instructions?: string;
    service?: order_Service;
};

