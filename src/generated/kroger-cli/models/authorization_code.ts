/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type authorization_code = {
    /**
     * Must be `authorization_code`.
     */
    grant_type: string;
    /**
     * The authorization code returned from the server.
     */
    code: string;
    /**
     * Your registered redirect URL. Must be the same redirect URL that was used for the authorizations code request.
     */
    redirect_uri: string;
};

