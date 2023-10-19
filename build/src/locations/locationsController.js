"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.LocationsController = void 0;
const tsoa_1 = require("tsoa");
const locationsService_1 = require("./locationsService");
const axios_1 = __importDefault(require("axios"));
let LocationsController = class LocationsController extends tsoa_1.Controller {
    getLocation(
    // @Path() locationId: number,
    // @Query() name?: string
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield axios_1.default.get(`https://api.kroger.com/v1/locations`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJpbmdyZWRpZW50Y2FydC02MTc1NGI3YmRhMGJlZTE3NGRlNWVjN2M0NmU1MzUxYzY5Njk0Njg2MDAwNzMyNjM5MDAiLCJleHAiOjE2OTc3Mjk3NTMsImlhdCI6MTY5NzcyNzk0OCwiaXNzIjoiYXBpLmtyb2dlci5jb20iLCJzdWIiOiIwNmY5OWYwMi1jMTk4LTVmZTktOTQ5OC0yMDhkZTMxMDAzOWUiLCJzY29wZSI6InByb2R1Y3QuY29tcGFjdCIsImF1dGhBdCI6MTY5NzcyNzk1MzUzMDYzOTYyNSwiYXpwIjoiaW5ncmVkaWVudGNhcnQtNjE3NTRiN2JkYTBiZWUxNzRkZTVlYzdjNDZlNTM1MWM2OTY5NDY4NjAwMDczMjYzOTAwIn0.alDXy2ppLqiyebSpJiu0xD5RmN1uMhVjjIBdqT0do9JzqrPmMcXAyRosNCPxWOdK4i3HjxeQBxY6zAI9aR-btsdgmxVqgwqirhocUVdlFZI0IiUCsvBw4Tjhonb0MiH5HueLNWdZObo3_lS5qDLQEGxWvam4wrhdAiP0-vY_uSP6VoZVh_kpST_ekJPIe_HcHEYud3DuxNiwEkZfddSJBIoNjTWOfKQy7jZFm5sx99H2IX4UlgllbscdNOPp26oolXXLoWIEkmZLv6CpdXe_Eielp6Nb683B0gxuvNoXSpv3-xsqu0xem_T5Q6f18uTRePiyFF1B50QamDNqvEm-3A'
                    }
                });
                if (response.status !== 200) {
                    throw new Error('An error occurred while fetching the location.');
                }
                return response.data;
            }
            catch (error) {
                console.error(error);
            }
            throw new Error('An error occurred while fetching the location.');
        });
    }
    createLocation(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setStatus(201); // set return status 201
            new locationsService_1.LocationsService().create(requestBody);
            return;
        });
    }
};
exports.LocationsController = LocationsController;
__decorate([
    (0, tsoa_1.Get)()
], LocationsController.prototype, "getLocation", null);
__decorate([
    (0, tsoa_1.SuccessResponse)("201", "Created") // Custom success response
    ,
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)())
], LocationsController.prototype, "createLocation", null);
exports.LocationsController = LocationsController = __decorate([
    (0, tsoa_1.Route)("locations")
], LocationsController);
