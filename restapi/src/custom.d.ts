import {Collection, Db, IntegerType} from "mongodb";

declare global{
    namespace Express {
        export interface Application {
            db?: Db,
            collection?: Collection
        }
    }
}
declare module 'express-session' {
    interface SessionData {
        userid: string
    }
}