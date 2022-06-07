import {AnyError, Db, MongoClient} from "mongodb";
import assert from "assert";
import {Application} from "express";


let _db: Db;

export function getDatabase(): Db{
    assert.ok(_db, "Die Verbindung zu der Datenbank wurde noch nicht hergestellt.");
    return _db;
}

type initDatabaseCallback = (error: null|AnyError, db: Db) => any;

export function initDatabase(callback: initDatabaseCallback){
    if (_db) {
        // tslint:disable-next-line:no-console
        console.warn("Es wird versucht die Datenbank erneut zu initiieren");
        return callback(null, _db);
    }
    const connectionUrl = "mongodb://" + process.env.DATABASE_NAME + ":" + process.env.DATABASE_PASSWORD + "@" + process.env.DATABASE_HOST + ":" + process.env.DATABASE_PORT;
    MongoClient.connect(connectionUrl, (error, client) => {
        if(error){
            return callback(error, _db);
        }
        _db = client.db('DHBWiki');
        return callback(null, _db);
    });
}
/*
export default {
    getDatabase: function(): Db{
        assert.ok(_db, "Die Verbindung zu der Datenbank wurde noch nicht hergestellt.");
        return _db;
    },
    initDatabase: function(callback: Function){
        if (_db) {
            console.warn("Trying to init DB again!");
            return callback(null, _db);
        }
        MongoClient.connect('mongodb://DHBWiki:Lor3m1psumD0lorS1t4met@46.38.234.197:27017', (error, client) => {
            if(error){
                return callback(null, _db);
            }
            _db = client.db('DHBWiki');
            return callback(null, _db);
        });
    }
}*/