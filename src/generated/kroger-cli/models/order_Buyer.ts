/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { order_Address } from './order_Address';

/**
 * Information about the person making the purchase
 */
export type order_Buyer = {
    /**
     * Pass customer date of birth, if the order contains alcohol. The date must be in YYYY-MM-DD format
     */
    dateOfBirth?: string;
    address?: order_Address;
};

