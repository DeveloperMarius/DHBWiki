import express from "express";
import {attach_default_routes, init_router, mongo_get_all} from "../utils/utils";
import {ErrorResponse} from "../utils/error_response";
import {SuccessResponse} from "../utils/success_response";
import {getDatabase} from "../database";
import {ObjectId} from "mongodb";

const router = init_router("classes");

attach_default_routes(router);

router.get('/:id/courses', (req, res) => {
    mongo_get_all((result: any) => {
        if(result === null){
            new ErrorResponse("Klasse nicht gefunden", 404).throw(res);
            return;
        }
        const resData : (number|string)[] = [];
        result.forEach((dataSet: {class: number|string, course: number|string}) => {
            resData.push(dataSet.course);
        })
        new SuccessResponse(resData).throw(res);
    }, getDatabase().collection("class_in_course"), {
        class: req.params.id
    })
});

// TODO getCourses

export default router;