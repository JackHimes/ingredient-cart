"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsService = void 0;
const axios_1 = __importDefault(require("axios"));
class LocationsService {
    getLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axios_1.default.get(`https://api.kroger.com/v1/locations`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJpbmdyZWRpZW50Y2FydC02MTc1NGI3YmRhMGJlZTE3NGRlNWVjN2M0NmU1MzUxYzY5Njk0Njg2MDAwNzMyNjM5MDAiLCJleHAiOjE2OTc3NDcxMjYsImlhdCI6MTY5Nzc0NTMyMSwiaXNzIjoiYXBpLmtyb2dlci5jb20iLCJzdWIiOiIwNmY5OWYwMi1jMTk4LTVmZTktOTQ5OC0yMDhkZTMxMDAzOWUiLCJzY29wZSI6InByb2R1Y3QuY29tcGFjdCIsImF1dGhBdCI6MTY5Nzc0NTMyNjk0NDg3MTA2NiwiYXpwIjoiaW5ncmVkaWVudGNhcnQtNjE3NTRiN2JkYTBiZWUxNzRkZTVlYzdjNDZlNTM1MWM2OTY5NDY4NjAwMDczMjYzOTAwIn0.NJtXufZo6MhRjld11MsRoBAfk2oOCKrNf5jQWvnLpQ4Cd5b7oQxe5ZDYNOTV4f2CTq0Ms-NGyj9whwXdwuHzsMQ-r6aEHhBfXHOrt2oqgrK4X6FGLMqNiJftEHs5V8Hh_VZlLoyk3lqAK0jq4SGMd9CHm22QiYWHPpITfFhd4wpNMmDryzgz1QacMOQXS9V3x7j-n_LQUX-oM87gKGtCBppgFzCFDNAoc8YzdEt0GioTMtjU-A2xY7f97_izPjfd9nIgfQjSzWiW3NtUTGZh8BWcd4u8vxDeH5R4K5q7zBAVL7uvDxQ_iP9rfiJeyW3Akpa5XBOCSbWd_la9UnFbsg'
                }
            });
            return response.data.data;
        });
    }
}
exports.LocationsService = LocationsService;
//# sourceMappingURL=locationsService.js.map