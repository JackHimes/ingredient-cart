/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { locations_departmentHours } from './locations_departmentHours';

export type locations_departmentAtLocation = {
    /**
     * The 2-digit department code.
     */
    departmentId?: string;
    /**
     * The name of the department.
     */
    name?: string;
    /**
     * The phone number of the department.
     */
    phone?: string;
    hours?: locations_departmentHours;
};

