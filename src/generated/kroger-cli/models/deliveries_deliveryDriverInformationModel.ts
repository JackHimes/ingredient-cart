/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Information about the delivery driver and their vehicle.
 */
export type deliveries_deliveryDriverInformationModel = {
    /**
     * The first name of the driver.
     */
    firstName?: string;
    /**
     * The last name of the driver.
     */
    lastName?: string;
    /**
     * Information about the vehicle used for the delivery.
     */
    vehicle?: {
        /**
         * The license plate number of the vehicle.
         */
        licensePlate?: string;
        /**
         * The year of the vehicle.
         */
        year?: string;
        /**
         * The model of the vehicle.
         */
        model?: string;
        /**
         * The make of the vehicle.
         */
        make?: string;
    };
};

