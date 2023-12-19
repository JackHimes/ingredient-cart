import { Db, MongoClient} from "mongodb";
import { singleton } from "tsyringe";

@singleton()
export class MongoService {
    public client: MongoClient;
    public db!: Db;

    constructor() {
        this.client = new MongoClient(process.env.MONGO_DB_URL as string); 
    }
    public async connect(database: string): Promise<Db> {
        return this.db = await this.client.db(database);
    }
}