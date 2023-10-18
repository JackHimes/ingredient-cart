import { RegisterRoutes } from "../build/routes";
import express, { Response as ExResponse, Request as ExRequest, json, urlencoded } from "express";
import swaggerUi from "swagger-ui-express";

export const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

// Use body parser to read sent json payloads
app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});


RegisterRoutes(app);