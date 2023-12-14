/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The estimated time the pickup will be available. Required when using the `CONFIRM` action.
 */
export type deliveries_payload_pickup = {
    /**
     * The datetime timezone in IANA format.
     */
    timezone: string;
    /**
     * The datetime value in ISO 8601 format.
     */
    value: string;
};

