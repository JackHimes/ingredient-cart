import { Request, Response, NextFunction } from 'express';
import { OAuth2Service, client_credentials } from '../generated/kroger-cli';
import { OpenAPI } from '../generated/kroger-cli';

const logRequest = async (req: Request, res: Response, next: NextFunction) => {
    OpenAPI.BASE = "https://api.kroger.com/v1"
    OpenAPI.HEADERS = { 'Content-Type': 'application/x-www-form-urlencoded' }

    let result = await OAuth2Service.accessToken(
        process.env.KROGER_API_TOKEN as string,
        new URLSearchParams( {
            "grant_type": "client_credentials",
            "scope": client_credentials.scope.PRODUCT_BASIC
        }).toString() as unknown as client_credentials)
    console.log(result);

    // If no token, hit end point to get new token. Check for exisiting token on User
    console.log(`${req.method} ${req.url}`);
    console.log(`${res}`);
    req.headers['whatever'] = "any string"
    next();
}

export default logRequest;
