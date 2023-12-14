/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * response schema for internal server error.
 */
export type lockers_ErrorResponse500 = {
    errors?: Array<{
        code?: string;
        reason?: string;
        datetime?: {
            value?: string;
            timezone?: string;
        };
    }>;
};

