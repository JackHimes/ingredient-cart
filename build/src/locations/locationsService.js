"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsService = void 0;
class LocationsService {
    get(id, name) {
        return {
            id,
            name: name !== null && name !== void 0 ? name : "New York Kroger",
        };
    }
    create(locationCreationParams) {
        return Object.assign({ id: Math.floor(Math.random() * 10000) }, locationCreationParams);
    }
}
exports.LocationsService = LocationsService;
