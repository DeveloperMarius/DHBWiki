import express from "express";
import {attach_default_routes, mongo_get, mongo_get_all, mongo_post} from "../utils/utils";
import {getDatabase} from "../database";
import {errorResponse, ErrorResponse} from "../utils/error_response";
import {SuccessResponse} from "../utils/success_response";
import {UploadedFile} from "express-fileupload";

const router = express.Router();

router.get('/:file/comments', ((req, res) => {
    mongo_get_all((result: any) => {
        if(result === null){
            new ErrorResponse("Datei nicht gefunden", 404);
            return;
        }
        /*let resData : (number|string)[] = [];
        result.forEach((dataSet: {file: number|string, class: number|string}) => {
            resData.push(dataSet.class);
        });*/
        new SuccessResponse(result).throw(res);
    }, getDatabase().collection('file_comments'), {
        file: req.params.file
    })
}));

router.post('/upload', async (req, res) => {
    try{
        if(!req.files){
            new ErrorResponse("Keine Dateien gefunden", 404);
            return;
        }
        let _file = req.files.file;
        if(Array.isArray(_file)){
            new ErrorResponse("File array instead of file found", 400);
            return;
        }
        let file : UploadedFile = _file;
        let created = Date.now();
        let fileType = file.name.split(".").pop();
        mongo_post((result: any) => {
            file.mv("../files/" + result._id + "." + fileType);
            new SuccessResponse(result).throw(res);
        }, res.locals.collection, {
            file_name: file.name,
            file_type: file.mimetype,
            file_permission: 1,
            title: req.body.title,
            description: req.body.description,
            user: req.body.user,
            modified: created,
            created: created
        });
    }catch (error){
        console.log(error);
        new ErrorResponse("Fehler beim upload!", 500);
    }
})

attach_default_routes(router, "files");

export default router;