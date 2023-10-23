import * as mongoDB from "mongodb";
// import * as dotenv from "dotenv";

export default class MongoService {
    client: mongoDB.MongoClient;

    constructor() {
        this.client = new mongoDB.MongoClient("mongodb://localhost:27017/");
     
    }
    async connect(): Promise<mongoDB.Db> {
        await this.client.connect();
        return this.client.db("ingredient-cart");
    }
}