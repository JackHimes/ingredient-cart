import { RegisterRoutes } from "../build/routes";
import express, { Response as ExResponse, Request as ExRequest, NextFunction, json, urlencoded } from "express";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
import dotenv from "dotenv"
// import { load } from 'ts-dotenv';
// https://github.com/LeoBakerHytch/ts-dotenv 

export const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);

app.use(json());
dotenv.config();

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

// Use body parser to read sent json payloads
app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});


RegisterRoutes(app);