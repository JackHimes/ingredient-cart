import { Request as ExRequest } from "express";
import { verifyToken } from "@clerk/backend";
import ApiError from "./lib/ApiError";

// What a verified request carries in request.user
export interface AuthUser {
  /** Clerk user ID (the token's `sub`), stable even if the user changes their email */
  userId: string;
}

export const CLERK_SECURITY = "clerk";

// Called by tsoa's generated routes for every endpoint marked @Security("clerk").
// Whatever this resolves to is set as request.user; a thrown error is passed to the app's errorHandler.
export async function expressAuthentication(
  request: ExRequest,
  securityName: string,
  _scopes?: string[]
): Promise<AuthUser> {
  if (securityName !== CLERK_SECURITY) {
    throw new Error(`Unknown security scheme: ${securityName}`);
  }

  const [scheme, token] = (request.headers.authorization ?? "").split(" ");
  if (scheme !== "Bearer" || !token) {
    throw new ApiError("Unauthorized", 401, "Missing bearer token");
  }

  try {
    const payload = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
    return { userId: payload.sub };
  } catch (error) {
    console.warn("Rejected Clerk token:", error instanceof Error ? error.message : error);
    throw new ApiError("Unauthorized", 401, "Invalid or expired session");
  }
}

// The verified user on a request that went through expressAuthentication
export const getAuthUser = (request: ExRequest): AuthUser => (request as ExRequest & { user: AuthUser }).user;
