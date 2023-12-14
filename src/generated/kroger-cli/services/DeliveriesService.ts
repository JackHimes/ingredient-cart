/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { deliveries_deliveriesResponse } from '../models/deliveries_deliveriesResponse';
import type { deliveries_deliveryResponse } from '../models/deliveries_deliveryResponse';
import type { deliveries_deliveryUpdateModel } from '../models/deliveries_deliveryUpdateModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DeliveriesService {

    /**
     * Get deliveries
     * Provides access to a list of available deliveries for courier confirmation.
     * You can use one of the optional `filter.followingAction` query parameter to filter deliveries:
     * * `CONFIRM` -  For deliveries in pending confirmation.
     * * `CONFIRM_EDITING` - For deliveries with pending edited that are not confirmed.
     * * `CONFIRM_CANCELLATION` -  For deliveries in canceled by Kroger that are not confirmed.
     *
     * @param filterFollowingAction The next action that should be taken for a delivery.
     * @returns deliveries_deliveriesResponse OK
     * @throws ApiError
     */
    public static getDeliveriesUsingGet(
        filterFollowingAction: 'CONFIRM' | 'CONFIRM_CANCELLATION' | 'CONFIRM_EDITING' = 'CONFIRM',
    ): CancelablePromise<deliveries_deliveriesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courier/deliveries',
            query: {
                'filter.followingAction': filterFollowingAction,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Get non-delivered
     * Provides access to a list of outstanding deliveries. <br><br>Deliveries are considered
     * outstanding when in the following states:
     * * `PendingConfirmation`
     * * `Scheduled`
     * * `NotConfirmed`
     * * `Edited`
     * * `EditsNotConfirmed`
     * * `EnRouteToPickup`
     * * `AtPickup`
     * * `PickedUp`
     * * `EnRouteToDropoff`
     *
     * @returns deliveries_deliveriesResponse OK
     * @throws ApiError
     */
    public static getNonDeliveredByPartnerUsingGet(): CancelablePromise<deliveries_deliveriesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courier/deliveries/non-delivered',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Update delivery
     * Provides access to update a delivery status. The `action` parameter
     * is required in the body for each update. <br><br>The payload parameter is only required
     * with the following actions:
     * * `CONFIRM`
     * * `CONFIRM_EDITING`
     * * `CANCEL`
     * * `EN_ROUTE_TO_PICK_UP`
     *
     * @param deliveryId A unique delivery ID.
     * @param requestBody The Action/Payload data structure for updating deliveries.
     * @returns deliveries_deliveryResponse OK
     * @throws ApiError
     */
    public static updateUsingPost(
        deliveryId: string,
        requestBody: deliveries_deliveryUpdateModel,
    ): CancelablePromise<deliveries_deliveryResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/courier/deliveries/{delivery_id}',
            path: {
                'delivery_id': deliveryId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

}
