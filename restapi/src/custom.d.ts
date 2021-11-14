import {Collection, Db} from "mongodb";

declare global{
    namespace Express {
        export interface Application {
            db?: Db,
            collection?: Collection
        }
    }
}