/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Schema to pass the unattended locker updates to the Kroger systems by the locker vendors.
 */
export type lockers_StatusUpdate = {
    /**
     * Order status
     */
    orderStatus: lockers_StatusUpdate.orderStatus;
    /**
     * Kroger Order ID.
     */
    orderId: string;
};

export namespace lockers_StatusUpdate {

    /**
     * Order status
     */
    export enum orderStatus {
        LOADED = 'LOADED',
        COLLECTED = 'COLLECTED',
    }


}

