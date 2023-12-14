/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { productId } from '../models/productId';
import type { products_productPayloadModel } from '../models/products_productPayloadModel';
import type { products_productsPayloadModel } from '../models/products_productsPayloadModel';
import type { UPC } from '../models/UPC';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductsService {

    /**
     * Product search
     * Allows you to find products by passing in either a search term or product Id.
     *
     * ### Initial Search Value Required
     *
     * An initial search value is requred for all requests. You can use either of the following parameters as an initial search value:
     *
     * `filter.term` - When using the term parameter, the API performs a fuzzy search based on the term provided in the string. Search results are based on how relevant the term is to the product description.
     *
     * `filter.brand` - When using the brand parameter, the API performs a search based on the brand provided in the string. Search results only contain products that match the brand queried for.
     *
     * `filter.productId` - When using the productId parameter, the API performs a query to find an exact match.
     *
     * @param filterTerm A search term to filter product results. As an example, you could input _milk_, _bread_, or _salt_. <br><br><b>Note</b> - Search terms are limited to a maximum of 8 words. Each new space in the search term denotes a new word.
     * @param filterLocationId The locationId of the location. When using this filter, only products available at that location are returned.
     * @param filterProductId The productId of the products(s) to return. For more than one item, the list must be comma-separated. When used, all other query parameters are ignored.
     * @param filterBrand The brand name of the products to return. When using this filter, only products by that brand are returned. Brand names are case-sensitive, and lists must be pipe-separated.
     * @param filterFulfillment The available fulfillment types of the product(s) to return. Fulfillment types are case-sensitive, and lists must be comma-separated. Must be one or more of the follow types: <ul> <li> `ais` - Available In Store</li> <li> `csp` - Curbside Pickup</li> <li> `dth` - Delivery To Home</li> <li> `sth` - Ship To Home</li> </ui>
     * @param filterStart The number of products to skip.
     * @param filterLimit The number of products to return.
     * @returns products_productsPayloadModel OK
     * @throws ApiError
     */
    public static productGet(
        filterTerm?: string,
        filterLocationId?: string,
        filterProductId?: string,
        filterBrand?: string,
        filterFulfillment?: 'ais' | 'csp' | 'dth' | 'sth',
        filterStart?: number,
        filterLimit?: number,
    ): CancelablePromise<products_productsPayloadModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products',
            query: {
                'filter.term': filterTerm,
                'filter.locationId': filterLocationId,
                'filter.productId': filterProductId,
                'filter.brand': filterBrand,
                'filter.fulfillment': filterFulfillment,
                'filter.start': filterStart,
                'filter.limit': filterLimit,
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
     * Product details
     * Provides access to the details of a specific product by either using the `productId` or `UPC`. To return the product price, availability, and aisle location, you must include the `filter.locationId` query parameter.
     * @param id
     * @param filterLocationId The locationId of the location. When using this filter, only products available at that location are returned.
     * @returns products_productPayloadModel OK
     * @throws ApiError
     */
    public static productGetId(
        id: (productId | UPC),
        filterLocationId?: string,
    ): CancelablePromise<products_productPayloadModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{id}',
            path: {
                'id': id,
            },
            query: {
                'filter.locationId': filterLocationId,
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
