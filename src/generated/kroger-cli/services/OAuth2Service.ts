/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { authorization_code } from '../models/authorization_code';
import type { authorization_codeResponse } from '../models/authorization_codeResponse';
import type { client_credentials } from '../models/client_credentials';
import type { client_credentialsResponse } from '../models/client_credentialsResponse';
import type { refresh_token } from '../models/refresh_token';
import type { refresh_tokenResponse } from '../models/refresh_tokenResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OAuth2Service {

    /**
     * Authorization Code
     * The redirect URL to authenticate a customer and receive an authorization code.
     * @param scope The level of access your application is requesting.
     * @param clientId Your application's client ID.
     * @param redirectUri Your registered redirect URL. The redirect URL is used by the server to redirect the web browser with the authorization  code once the customer has given consent.
     * @param responseType Is always `code`.
     * @param state A random string to verify that the response belongs to the initiated  request. The server should always return the same state as the one specified in  the request to protect against forgery attacks.
     * @returns void
     * @throws ApiError
     */
    public static authorizationCode(
        scope: 'profile.name' | 'profile.basic' | 'profile.loyalty' | 'profile.full' | 'product.personalized' | 'cart.basic' | 'cart.basic:rw',
        clientId: string,
        redirectUri: string,
        responseType: string,
        state?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connect/oauth2/authorize',
            query: {
                'scope': scope,
                'client_id': clientId,
                'redirect_uri': redirectUri,
                'response_type': responseType,
                'state': state,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Access Token
     * The OAuth2 endpoint that provides access tokens.
     * @param authorization Your `client_id:client_secret` base64 encoded.
     * @param formData
     * @returns any OK
     * @throws ApiError
     */
    public static accessToken(
        authorization: string,
        formData?: (client_credentials | authorization_code | refresh_token),
    ): CancelablePromise<(client_credentialsResponse | authorization_codeResponse | refresh_tokenResponse)> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/connect/oauth2/token',
            headers: {
                'Authorization': authorization,
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
