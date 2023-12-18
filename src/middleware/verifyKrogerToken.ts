import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const logRequest = async (req: Request, res: Response, next: NextFunction) => {
    const baseURL = "https://api.kroger.com/v1";
    const headers = { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic aW5ncmVkaWVudGNhcnQtNjE3NTRiN2JkYTBiZWUxNzRkZTVlYzdjNDZlNTM1MWM2OTY5NDY4NjAwMDczMjYzOTAwOmN6MHV4cXBmTk9keG5tUU5KR2JldDhDN1dQSXJPZmVCOUljUTF6Vmg='
    };

    try {
        const response = await axios.post(
            `${baseURL}/connect/oauth2/token`,
            new URLSearchParams({
                "grant_type": "client_credentials",
                "scope": "profile.compact"
            }).toString(),
            { headers } 
        )
        const result = response.data
        console.log(result);
    } catch (error) {
        console.error("Error obtaining access token: ", error);
    }

    // If no token, hit end point to get new token. Check for exisiting token on User
    console.log(`${req.method} ${req.url}`);
    console.log(`${res}`);
    req.headers['whatever'] = "any string"
    next();
}

export default logRequest;
