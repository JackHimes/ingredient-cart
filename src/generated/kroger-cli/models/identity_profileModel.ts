/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { identity_profileAddressModel } from './identity_profileAddressModel';
import type { identity_profileLoyaltyModel } from './identity_profileLoyaltyModel';
import type { identity_profilePhoneNumberModel } from './identity_profilePhoneNumberModel';

export type identity_profileModel = {
    data?: {
        /**
         * The customer's first name.
         */
        firstName?: string;
        /**
         * The customer's last name.
         */
        lastName?: string;
        /**
         * The customer's address.
         */
        addresses?: Array<identity_profileAddressModel>;
        loyalty?: identity_profileLoyaltyModel;
        /**
         * The customer's profile Id.
         */
        id?: string;
        /**
         * The customer's email address.
         */
        email?: string;
        /**
         * An array of the customer's phone numbers.
         */
        phoneNumbers?: Array<identity_profilePhoneNumberModel>;
    };
    meta?: any;
};

