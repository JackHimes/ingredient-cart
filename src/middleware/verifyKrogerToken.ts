import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const logRequest = async (req: Request, res: Response, next: NextFunction) => {
    const baseURL = "https://api.kroger.com/v1";
    const headers = { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': process.env.KROGER_API_TOKEN
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
        // res.setHeader('kroger-authorization', result.access_token) 
        console.log(result);
        (req as any).token = result.access_token
        next();

    } catch (error) {
        console.error("Error obtaining access token: ", error);
        res.status(500).json({ error: "Failed to obtain access token"})

    }

    // If no token, hit end point to get new token. Check for exisiting token on User
    console.log(`${req.method} ${req.url}`);
    console.log(`${res}`);
}

export default logRequest;
