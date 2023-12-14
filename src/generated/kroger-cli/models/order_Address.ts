/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type order_Address = {
    /**
     * Name of the customer.
     */
    name?: string;
    /**
     * Name of the company, if one exists.
     */
    company?: string;
    /**
     * Whether the address is residential or not.
     */
    residential?: boolean;
    /**
     * An array of up to 3 lines for the street address or PO Box.
     */
    addressLines: Array<string>;
    /**
     * Name of the city or town.
     */
    cityTown: string;
    /**
     * Two-digit state code.
     */
    stateProvince: string;
    /**
     * Postal code in abbreviated or extended format. It can't contain any special characters and needs to be in US zip or zip+4 code format.
     */
    postalCode: string;
    /**
     * Last four digits of the nine-digit US postal code.
     */
    carrierRoute?: string;
    /**
     * Two-digit delivery point. It is in XX format.
     */
    deliveryPoint?: string;
    /**
     * Two-digit country code. It is in XX format and follow ISO 3166-1 alpha-2 codes
     */
    countryCode: string;
    /**
     * Phone number of the customer. It is in "+" + `<country code>` + `<subscriber number with area code>` format.
     */
    phone?: string;
    /**
     * Email address of the customer.
     */
    email?: string;
    /**
     * Tax identification number of the partner.
     */
    taxId?: string;
};

