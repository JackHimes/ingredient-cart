/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { catalog_productsResponseModel } from '../models/catalog_productsResponseModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CatalogService {

    /**
     * Catalog Search
     * Search the product catalog based upon specified criteria. Available parameters depend upon the type of location being searched and the modality. The two supported types of locations are as follows: <ul><li>Stores: Physical locations that customers are able to visit.</li><li>Distribution Centers: Locations that provide delivery services only with no customer access.</li></ul><br>The four supported modalities are as follows: <ul><li>DELIVERY: when items are delivered by a Kroger or partner delivery service that can safely deliver perishable goods.</li><li>SHIP: when non-perishable items are delivered via a shipping service.</li><li>PICK_UP: when the order is picked at a Kroger location and the customer picks it up from that location.</li><li>IN_STORE: when customers visit a store in person and pick their items, check out, and take their items home.</li></ul>
     * <h3>Stores catalog:</h3><table border=1><th align=center><font size=+0>Available Filters</font></th><th align=center><font size=+0>Supported Operators</font></th><th align=center><font size=+0>DELIVERY</font></th><th align=center><font size=+0>SHIP / PICK_UP / IN_STORE</font></th><tr><td align=center><font size=+0>filter.name </font></td><td align=center><font size=+0>eq, like</font></td><td align=center><font size=+0>Yes</font></td><td align=center><font size=+0>No</font><tr><td align=center><font size=+0>filter.barcodes</font></td><td align=center><font size=+0>eq</font></td><td align=center><font size=+0>Yes</font></td><td align=center><font size=+0>No</font></td></tr><tr><td align=center><font size=+0>filter.storeId</font></td><td align=center><font size=+0>eq</font></td><td align=center><font size=+0>Yes</font></td><td align=center><font size=+0>Yes</font></td></tr><tr><td align=center><font size=+0>filter.primaryCategoryId</font></td><td align=center><font size=+0>eq</font></td><td align=center><font size=+0>Yes</font></td><td align=center><font size=+0>No</font></td></tr><tr><td align=center><font size=+0>filter.krogerId</font></td><td align=center><font size=+0>eq, in</font></td><td align=center><font size=+0>Yes</font></td><td align=center><font size=+0>Yes</font></td></tr></tr><tr><td align=center><font size=+0>filter.status</font></td><td align=center><font size=+0>eq</font></td><td align=center><font size=+0>Yes</font></td><td align=center><font size=+0>Yes</font></td></tr><tr><td align=center><font size=+0>filter.modality</font></td><td align=center><font size=+0>eq</font></td><td align=center><font size=+0>Yes</font></td><td align=center><font size=+0>Yes</font></td></tr><tr><td align=center><font size=+0>filter.updatedAt</font></td><td align=center><font size=+0>range</font></td><td align=center><font size=+0>Yes</font></td><td align=center><font size=+0>No</font></td></tr></table><br><b><h3>Distribution centers catalog:</h3></b><table border=1><th align=center><font size=+0>Available Filters</font></th><th align=center><font size=+0>Supported Operators</font></th><th align=center><font size=+0>DELIVERY</font></th><th align=center><font size=+0>SHIP / PICK_UP / IN_STORE</font></th><tr><td align=center><font size=+0>filter.postalCode</font></td><td align=center><font size=+0>eq, in</font></td><td align=center><font size=+0>Yes</font></td><td align=center><font size=+0>No</font></td></tr><tr><td align=center><font size=+0>filter.storeId</font></td><td align=center><font size=+0>eq</font></td><td align=center><font size=+0>Yes</font></td><td align=center><font size=+0>No</font></td></tr><tr><td align=center><font size=+0>filter.krogerId</font></td><td align=center><font size=+0>eq, in</font></td><td align=center><font size=+0>Yes</font></td><td align=center><font size=+0>No</font></td></tr></tr><tr><td align=center><font size=+0>filter.modality</font></td><td align=center><font size=+0>eq</font></td><td align=center><font size=+0>Yes</font></td><td align=center><font size=+0>No</font></td></tr><tr><td align=center><font size=+0>filter.updatedAt</font></td><td align=center><font size=+0>range</font></td><td align=center><font size=+0>Yes</font></td><td align=center><font size=+0>No</font></td></tr></table> <br> <b>Note:</b> filter.postalCode, filter.storeId and filter.modality are mandatory filters for distribution centers catalog.
     * @param projections The defined set of fields and objects to return from the request.
     *
     * **Projection Format:** `products.{shape}`
     *
     * **Available Shapes:**
     * <li><code>full</code></li>
     * <li><code>compact</code></li>
     *
     * **projections:**
     * * `--` - Returns compact by default
     * * `products.compact`
     *
     * * product attributes
     * * `products.full`
     *
     * * product attributes
     * * brand
     * * primary category
     * * secondary category
     * * store specific data
     *
     * @param filterNameEq Exact match to product name. (When filter.modality is set to DELIVERY.)
     * @param filterNameLike All products containing substring in their product name will be returned. (When filter.modality is set to DELIVERY.)
     * @param filterBarcodesEq Exact match of barcode. (When filter.modality is set to DELIVERY.)
     * @param filterStoreIdEq Exact match to the 8-character storeId. When using this filter, only products available at that store are returned. <br><br>This is required if PICK_UP, DELIVERY, or IN_STORE modality is used.<br><br> <b>Note</b> - A maximum of 20 store details (in descending order of store id) will be returned by default in the full projection when storeId isn't given in the request.
     * @param filterPostalCodeEq Exact match to postal code or ZIP code.(When filter.modality is set to DELIVERY for distribution centers.) <br><br> This is required when requesting DELIVERY from distribution centers. <br><br><b>Note:</b> For US addresses, 5-digit or 9-digit ZIP+4 are supported.
     * @param filterPostalCodeIn Exact match to each of the postal codes or ZIP codes in a comma separated list.(When filter.modality is set to DELIVERY for distribution centers.) <br><br>Max Allowed: 100 for distribution centers DELIVERY store products<br><br> This is required when requesting DELIVERY from distribution centers. <br><br><b>Note:</b> For US addresses, 5-digit or 9-digit ZIP+4 are supported.
     * @param filterPrimaryCategoryIdEq Exact match of the category identifier. (When filter.modality is set to DELIVERY.)
     * @param filterKrogerIdEq Exact match to product identifier, typically UPC or GTIN.
     * @param filterKrogerIdIn Exact match to each product identifier in a comma separated list, typically UPCs or GTINs.<br><br>Max Allowed for DELIVERY: 100<br><br>Max Allowed for PICK_UP, IN_STORE, and SHIP: 50
     * @param filterStatusEq Exact match to product status.
     * @param filterModalityEq Exact match to product fulfillment option.
     * @param filterUpdatedAtRange Products updated between specified dates (inclusive). (When filter.modality is set to DELIVERY.)
     * @param pageOffset Starting point for paginated results.
     * @param pageSize Number of products to return per page.<br><br>Allowed range for DELIVERY: [1-100]<br><br>Allowed range for PICK_UP, IN_STORE, and SHIP: [1-50]
     * @returns catalog_productsResponseModel Success
     * @throws ApiError
     */
    public static getPartnerCatalogProducts(
        projections?: string,
        filterNameEq?: string,
        filterNameLike?: string,
        filterBarcodesEq?: string,
        filterStoreIdEq?: string,
        filterPostalCodeEq?: string,
        filterPostalCodeIn?: string,
        filterPrimaryCategoryIdEq?: string,
        filterKrogerIdEq?: string,
        filterKrogerIdIn?: string,
        filterStatusEq?: 'ENABLED' | 'DISABLED',
        filterModalityEq?: 'DELIVERY' | 'SHIP' | 'PICK_UP' | 'IN_STORE',
        filterUpdatedAtRange?: string,
        pageOffset?: number,
        pageSize: number = 20,
    ): CancelablePromise<catalog_productsResponseModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/partner/catalog/products',
            query: {
                'projections': projections,
                'filter.name.eq': filterNameEq,
                'filter.name.like': filterNameLike,
                'filter.barcodes.eq': filterBarcodesEq,
                'filter.storeId.eq': filterStoreIdEq,
                'filter.postalCode.eq': filterPostalCodeEq,
                'filter.postalCode.in': filterPostalCodeIn,
                'filter.primaryCategoryId.eq': filterPrimaryCategoryIdEq,
                'filter.krogerId.eq': filterKrogerIdEq,
                'filter.krogerId.in': filterKrogerIdIn,
                'filter.status.eq': filterStatusEq,
                'filter.modality.eq': filterModalityEq,
                'filter.updatedAt.range': filterUpdatedAtRange,
                'page.offset': pageOffset,
                'page.size': pageSize,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }

}
