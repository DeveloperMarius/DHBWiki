import express from "express";
import {attach_default_routes, init_router, mongo_get, mongo_get_all, mongo_post} from "../utils/utils";
import {getDatabase} from "../database";
import {errorResponse, ErrorResponse} from "../utils/error_response";
import {SuccessResponse} from "../utils/success_response";
import {UploadedFile} from "express-fileupload";
import {ObjectId} from "mongodb";

const router = init_router("files");

router.get('/:file/comments', ((req, res) => {
    mongo_get_all((result: any) => {
        if(result === null){
            new ErrorResponse("Datei nicht gefunden", 404).throw(res);
            return;
        }
        /*let resData : (number|string)[] = [];
        result.forEach((dataSet: {file: number|string, class: number|string}) => {
            resData.push(dataSet.class);
        });*/
        new SuccessResponse(result).throw(res);
    }, getDatabase().collection('file_comments'), {
        _id: new ObjectId(req.params.file)
    })
}));

router.get('/:file/asset', (req, res) => {
    mongo_get((result: any) => {
        if(result === null){
            new ErrorResponse("Datei nicht gefunden", 404).throw(res);
            return;
        }
        const fileType = result.file_name.split(".").pop();
        console.log("load: " + __dirname  + "/../files/" + result._id + "." + fileType);
        res.sendFile(__dirname + '/../files/' + result._id + '.' + fileType);
    }, res.locals.collection, {
        file: req.params.file
    });
});

router.post('/upload', async (req, res) => {
    try{
        if(!req.files){
            new ErrorResponse("Keine Dateien gefunden", 404).throw(res);
            return;
        }
        const _file = req.files.file;
        if(Array.isArray(_file)){
            new ErrorResponse("File array instead of file found", 400).throw(res);
            return;
        }
        const file : UploadedFile = _file;
        const created = Date.now();
        const fileType = file.name.split(".").pop();
        mongo_post((result: any) => {
            console.log("move to: " + __dirname  + "/../files/" + result._id + "." + fileType);
            file.mv(__dirname  + "/../files/" + result._id + "." + fileType);
            new SuccessResponse(result).throw(res);
        }, res.locals.collection, {
            file_name: file.name,
            file_type: file.mimetype,
            file_permission: 1,
            title: req.body.title,
            description: req.body.description,
            user: req.body.user,
            course: req.body.course,
            topic: req.body.topic,
            modified: created,
            created
        });
    }catch (error){
        console.log(error);
        new ErrorResponse("Fehler beim upload!", 500).throw(res);
    }
});

router.get('/user/:id', (req, res) => {
    mongo_get_all((result: any) => {
        if(result === null){
            new ErrorResponse("Fehler", 404).throw(res);
            return;
        }
        new SuccessResponse(result).throw(res);
    }, res.locals.collection, {
        user: req.params.id
    })
});

router.get('/course/:id', (req, res) => {
    mongo_get_all((result: any) => {
        if(result === null){
            new ErrorResponse("Fehler", 404).throw(res);
            return;
        }
        new SuccessResponse(result).throw(res);
    }, res.locals.collection, {
        course: req.params.id
    })
});

attach_default_routes(router);

export default router;