/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type client_credentials = {
    /**
     * Must be `client_credentials`.
     */
    grant_type: string;
    /**
     * The level of access your application is requesting.
     */
    scope?: client_credentials.scope;
};

export namespace client_credentials {

    /**
     * The level of access your application is requesting.
     */
    export enum scope {
        PROFILE_EXISTS = 'profile.exists',
        PRODUCT_BASIC = 'product.basic',
        DELIVERY_BASIC = 'delivery.basic',
        DELIVERY_BASIC_RW = 'delivery.basic:rw',
    }


}

