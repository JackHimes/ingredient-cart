/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Category = {
    /**
     * id of the category to which the product belongs
     */
    id?: number;
    /**
     * name of the category
     */
    name?: string;
    /**
     * human-readable, unique identifier of the category
     */
    slug?: string;
    parentCategory?: Category;
    /**
     * field to enable/disable the field in the api response
     */
    status?: Category.status;
};

export namespace Category {

    /**
     * field to enable/disable the field in the api response
     */
    export enum status {
        ENABLED = 'ENABLED',
        HIDDEN = 'HIDDEN',
    }


}

