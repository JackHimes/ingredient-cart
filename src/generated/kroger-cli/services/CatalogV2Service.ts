/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { catalog_v2_products_inventory_response } from '../models/catalog_v2_products_inventory_response';
import type { catalog_v2_products_response } from '../models/catalog_v2_products_response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CatalogV2Service {

    /**
     * Catalog Search
     * Search the product catalog based upon specified criteria.
     * @param filterLocationsIdEq Exact match to the 8-character locationId for the store or distribution center.
     *
     * (filter.storeId.eq in the original Catalog Search endpoint.)
     * @param filterLocationsFulfillmentEq Exact match to product fulfillment option.
     *
     * Must be one of: DELIVERY, SHIP, PICKUP, or INSTORE.
     *
     * (filter.modality.eq in the original Catalog Search endpoint.)
     * @param filterUpcIn Exact match to product identifier, typically UPC, or GTIN.
     *
     * Duplicate UPCs if present in the request parameter are ignored.
     *
     * Max allowed non-duplicate UPCs per request: 50
     * @param filterUpdatedAtRange The updated date range provided as a comma separated set with the start date and end date in that order.
     *
     * Products updated within this range (inclusive) will be returned.
     * @param pageOffset Starting point for paginated results.
     * @param pageSize Number of products obtained per page.<br><br>Allowed range: [1 - 50]
     * @returns catalog_v2_products_response Success
     * @throws ApiError
     */
    public static getPartnerCatalogV2Products(
        filterLocationsIdEq: string,
        filterLocationsFulfillmentEq: string,
        filterUpcIn?: string,
        filterUpdatedAtRange?: string,
        pageOffset?: number,
        pageSize: number = 20,
    ): CancelablePromise<catalog_v2_products_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/partner/catalog/v2/products',
            query: {
                'filter.upc.in': filterUpcIn,
                'filter.locations.id.eq': filterLocationsIdEq,
                'filter.locations.fulfillment.eq': filterLocationsFulfillmentEq,
                'filter.updatedAt.range': filterUpdatedAtRange,
                'page.offset': pageOffset,
                'page.size': pageSize,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Catalog Inventory
     * Search a location's product catalog for inventory-specific details. Current stock levels, fulfillment status, and active promotions are included.
     * @param filterLocationsIdEq Exact match to the 8-character locationId for the store or distribution center.
     *
     * (filter.storeId.eq in the original Catalog Search endpoint.)
     * @param filterLocationsFulfillmentEq Exact match to product fulfillment option.<br><br>Must be one of: DELIVERY, SHIP, PICKUP, or INSTORE.
     *
     * (filter.modality.eq in the original Catalog Search endpoint.)
     * @param filterUpcIn Exact match to product identifier, typically UPC, or GTIN.<br><br>Duplicate UPCs if present in the request parameter are ignored. <br><br>Max allowed non-duplicate UPCs per request: 50
     * @param filterStockLevelUpdatedAtRange The last stock level updated date range provided as a comma separated set with the start date and end date in that order. Products with stock levels updated within this range (inclusive) will be returned.
     * @param filterFulfillmentUpdatedAtRange The last fulfillment updated date range provided as a comma separated set with the start date and end date in that order. Products with fulfillment updated within this range (inclusive) will be returned.
     * @param filterUpdatedAtRange The updated date range provided as a comma separated set with the start date and end date in that order. Products updated within this range (inclusive) will be returned.
     * @param pageOffset Starting point for paginated results.
     * @param pageSize Number of products obtained per page.<br><br>Allowed range: [1 - 50]
     * @returns catalog_v2_products_inventory_response Success
     * @throws ApiError
     */
    public static getPartnerCatalogV2ProductsInventory(
        filterLocationsIdEq: string,
        filterLocationsFulfillmentEq: string,
        filterUpcIn?: string,
        filterStockLevelUpdatedAtRange?: string,
        filterFulfillmentUpdatedAtRange?: string,
        filterUpdatedAtRange?: string,
        pageOffset?: number,
        pageSize: number = 20,
    ): CancelablePromise<catalog_v2_products_inventory_response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/partner/catalog/v2/products-inventory',
            query: {
                'filter.upc.in': filterUpcIn,
                'filter.locations.id.eq': filterLocationsIdEq,
                'filter.locations.fulfillment.eq': filterLocationsFulfillmentEq,
                'filter.stockLevelUpdatedAt.range': filterStockLevelUpdatedAtRange,
                'filter.fulfillmentUpdatedAt.range': filterFulfillmentUpdatedAtRange,
                'filter.updatedAt.range': filterUpdatedAtRange,
                'page.offset': pageOffset,
                'page.size': pageSize,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
