import express from "express";
import {getDatabase} from "../database";
import {Collection, AnyError, MongoError, ObjectId} from "mongodb";
import {ErrorResponse, errorResponse} from "../utils/error_response";
import {SuccessResponse, successResponse} from "../utils/success_response";
import {attach_default_routes, mongo_get, mongo_get_all, mongo_post, mongo_update} from "../utils/utils";
import bcrypt from "bcrypt";

const router = express.Router();

router.post('/', (req, res, next) => {
   bcrypt.hash(req.body.password, 5, (error, hash) => {
      if(error !== undefined){
         errorResponse(res, new ErrorResponse("Fehler beim hashen den Passworts", 500));
         return;
      }
      req.body.password = hash;
      next();
   });
});

router.post('/auth', (req, res) => {
   let filter : {username?: string, email?: string} = {};
   if(req.body.username !== undefined){
      filter.username = req.body.username;
   }
   if(req.body.email !== undefined){
      filter.email = req.body.email;
   }
   mongo_get((result: any) => {
      if(result === null){
         errorResponse(res, new ErrorResponse("Benutzer nicht gefunden", 404));
      }
      bcrypt.compare(req.body.password, result.password, (error, result2) => {
         if(error !== undefined){
            errorResponse(res, new ErrorResponse("Fehler beim vergleichen der Passwörter", 500));
            return;
         }
         if(result2){
            delete result.password;
            successResponse(res, new SuccessResponse(result));
         }else{
            errorResponse(res, new ErrorResponse("Falsches Passwort", 401));
         }
      });
   }, res.locals.collection, filter);
});

router.get('/:id/classes', (req, res) => {
   mongo_get_all((result: any) => {
      if(result === null){
         new ErrorResponse("Benutzer nicht gefunden", 404).throw(res);
         return;
      }
      let resData : (number|string)[] = [];
      result.forEach((dataSet: {user: number|string, class: number|string}) => {
         resData.push(dataSet.class);
      })
      new SuccessResponse(resData).throw(res);
   }, getDatabase().collection("user_in_class"), {
      _id: new ObjectId(req.params.id)
   })
});

router.get('/:id/courses', (req, res) => {
   mongo_get_all((result: any) => {
      if(result === null){
         new ErrorResponse("Benutzer nicht gefunden", 404).throw(res);
         return;
      }
      let resData : (number|string)[] = [];
      result.forEach((dataSet: {user: number|string, course: number|string}) => {
         resData.push(dataSet.course);
      })
      new SuccessResponse(resData).throw(res);
   }, getDatabase().collection("user_in_course"), {
      _id: new ObjectId(req.params.id)
   })
});

attach_default_routes(router, "users");

export default router;