import {Collection, MongoError, ObjectId} from "mongodb";
import {SuccessResponse, successResponse} from "./success_response";
import {Router} from "express";
import {ErrorResponse, errorResponse} from "./error_response";
import {getDatabase} from "../database";

export function mongo_get(callback: (result: {}|null) => any, collection: Collection, filter: number|string|{}){
    if(typeof filter == 'number' || typeof filter == 'string'){
        filter = {
            _id: new ObjectId(filter)
        };
    }
    collection.findOne(filter)
        .then(result => {
            return callback(result);
        })
        .catch((error: MongoError) => {
            console.error(error);
            return callback(null);
            // errorResponse(res, new ErrorResponse(error.name, error.code, error.message))
        });
}

export function mongo_get_all(callback: (result: {}|[]|null) => any, collection: Collection, filter: {} = {}){
    collection.find(filter).toArray()
        .then(result => {
            return callback(result);
        })
        .catch(error => {
            console.error(error);
            return callback(null);
        });
}

export function mongo_post(callback: (result: {}|null) => any, collection: Collection, data: {}){
    collection.insertOne(data)
        .then(result => {
            return callback(data);
        })
        .catch(error => {
            console.error(error);
            return callback(data);
        });
}

export function mongo_update(callback: (result: {}|null) => any, collection: Collection, id: number|string, data: {}){
    collection.updateOne({
        _id: new ObjectId(id)
    }, data)
        .then(result => {
            console.log("res", result);
            return callback(result);
        })
        .catch((error: MongoError) => {
            console.error(error);
            return callback(null);
        })
}

export function attach_default_routes(router: Router, mongoCollection: string){

    router.use((req, res, next) => {
        res.locals.collection = getDatabase().collection(mongoCollection);
        next();
    });

    router.post('/', (req, res) => {
        const collection : Collection = res.locals.collection;
        const reqData : {} = req.body;
        mongo_post((result: any) => {
            if(result === null){
                errorResponse(res, new ErrorResponse(`Error`, 403));
                return;
            }
            successResponse(res, new SuccessResponse(result));
        }, collection, reqData);
    });

    router.get('/', (req, res) => {
        const collection : Collection = res.locals.collection;
        mongo_get_all((result: any) => {
            if(result === null){
                new ErrorResponse(`No data found`, 404).throw(res);
                return;
            }
            new SuccessResponse(result).throw(res);
        }, collection);
    });

    router.get('/:id', (req, res) => {
        const collection : Collection = res.locals.collection;
        mongo_get((result: any) => {
            if(result === null){
                new ErrorResponse(`No data found for id ${req.params.id}`, 404).throw(res);
                return;
            }
            new SuccessResponse(result).throw(res);
        }, collection, req.params.id);
    });

    router.patch('/:id', (req, res) => {
        const collection : Collection = res.locals.collection;
        console.log("req", req.body);
        mongo_update((result: any) => {
            if(result === null){
                errorResponse(res, new ErrorResponse(`Error`, 403));
                return;
            }
            successResponse(res, new SuccessResponse(result));
        }, collection, req.params.id, req.body);
    });
}
