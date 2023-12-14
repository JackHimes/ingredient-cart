/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { order_Address } from './order_Address';

/**
 * Customer contact information.
 */
export type order_Contact = {
    /**
     * First name.
     */
    firstName: string;
    /**
     * Last name.
     */
    lastName: string;
    /**
     * Phone number.
     */
    phone: string;
    address: order_Address;
};

