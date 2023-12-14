/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { products_productItemFulfillmentModel } from './products_productItemFulfillmentModel';
import type { products_productItemInventoryModel } from './products_productItemInventoryModel';
import type { products_productItemPriceModel } from './products_productItemPriceModel';

export type products_productItemModel = {
    /**
     * The UPC of the item.
     */
    itemId?: string;
    inventory?: products_productItemInventoryModel;
    favorite?: boolean;
    fulfillment?: products_productItemFulfillmentModel;
    price?: products_productItemPriceModel;
    nationalPrice?: products_productItemPriceModel;
    /**
     * A description of the item size.
     */
    size?: string;
    /**
     * Indicates how this item is sold. Values returned are typically either "weight" or "unit"
     */
    soldBy?: string;
};

