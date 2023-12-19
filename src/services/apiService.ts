import { MongoService } from "../services/mongoService";
import { iocContainer } from "../ioc";
import { Db } from "mongodb";

export class ApiService {
  db: Db;

  constructor() {
    this.db = iocContainer.get(MongoService).db;
  }
} 