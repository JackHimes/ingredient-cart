// src/server.ts
import { app } from "./app";
import { iocContainer } from "./ioc";
import { MongoService } from "./services/mongoService";

const port = process.env.PORT || 4000;
const INGREDIENT_CART_DATABASE = 'ingredient-cart'

app.listen(port, () => {
  iocContainer.get(MongoService).connect(INGREDIENT_CART_DATABASE);
  console.log(`Example app listening at http://localhost:${port}`);
});