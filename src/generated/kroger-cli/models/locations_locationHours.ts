/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { locations_dailyHours } from './locations_dailyHours';

export type locations_locationHours = {
    /**
     * Indicates if the location is open 24 hours.
     */
    Open24?: boolean;
    /**
     * The utc timezone offset from gmt.
     */
    gmtOffset?: string;
    /**
     * The timezone of the location.
     */
    timezone?: string;
    friday?: locations_dailyHours;
    monday?: locations_dailyHours;
    saturday?: locations_dailyHours;
    sunday?: locations_dailyHours;
    thursday?: locations_dailyHours;
    tuesday?: locations_dailyHours;
    wednesday?: locations_dailyHours;
};

