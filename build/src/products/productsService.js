"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
class ProductsService {
    get(id, name) {
        return {
            id,
            name: name !== null && name !== void 0 ? name : "Apple",
        };
    }
    create(productCreationParams) {
        return Object.assign({ id: Math.floor(Math.random() * 10000) }, productCreationParams);
    }
}
exports.ProductsService = ProductsService;
