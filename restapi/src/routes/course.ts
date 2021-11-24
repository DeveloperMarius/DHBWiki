import express from "express";
import {attach_default_routes, mongo_get_all} from "../utils/utils";
import {ErrorResponse} from "../utils/error_response";
import {SuccessResponse} from "../utils/success_response";
import {getDatabase} from "../database";
import {ObjectId} from "mongodb";

const router = express.Router();

router.get("/user/:id", (req, res) => {
    mongo_get_all((result: any) => {
        if(result === null){
            new ErrorResponse("Fehler", 404).throw(res);
            return;
        }
        new SuccessResponse(result).throw(res);
    }, getDatabase().collection("courses"), {
        user: new ObjectId(req.params.id)
    })
});

attach_default_routes(router, "courses");

export default router;