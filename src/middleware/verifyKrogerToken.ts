import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { UsersService } from '../users/usersService';
import { jwtDecode } from 'jwt-decode';

const logRequest = async (req: Request, res: Response, next: NextFunction) => {
    const baseURL = "https://api.kroger.com/v1";
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': process.env.KROGER_API_TOKEN
    };

    const currentTimestamp = Math.floor(Date.now() / 1000)

    // Retrieve User and token
    const usersService = await new UsersService;
    let loggedInUser = usersService.get("658466600eda8259e7b98f0b")
    let token = (await loggedInUser).krogerToken

    // Refresh Token if expired and non-existent
    if (token !== null && token !== undefined) {
        let decoded_token = jwtDecode(token)

        if (decoded_token.exp && decoded_token.exp < currentTimestamp) {
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
                usersService.update("658466600eda8259e7b98f0b", { krogerToken: result.access_token })
                next();

            } catch (error) {
                console.error("Error obtaining access token: ", error);
                res.status(500).json({ error: "Failed to obtain access token" })

            }
        } else {
            console.log("NO TOKEN REFRESH HERE BOY");
        }
    }

    console.log(`${req.method} ${req.url}`);
    console.log(`${res}`);
}

export default logRequest;
