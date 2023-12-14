/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The defined set of fields and objects to return from the request.
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
 */
export type catalog_productProjections = string;
