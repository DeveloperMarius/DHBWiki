import express from "express";
import { getDatabase } from "../database";
import { Collection, AnyError, MongoError, ObjectId } from "mongodb";
import { ErrorResponse, errorResponse } from "../utils/error_response";
import { SuccessResponse, successResponse } from "../utils/success_response";
import {
  attach_default_routes,
  init_router,
  mongo_get,
  mongo_get_all,
  mongo_post,
  mongo_update,
} from "../utils/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = init_router("users");

router.post("/", (req, res, next) => {
  bcrypt.hash(req.body.password, 5, (error, hash) => {
    if (error !== undefined) {
      errorResponse(
        res,
        new ErrorResponse("Fehler beim hashen den Passworts", 500)
      );
      return;
    }
    req.body.position = 1;
    req.body.password = hash;
    next();
  });
});

router.post("/auth", (req, res) => {
  const filter: { username?: string; email?: string } = {};
  if (req.body.username !== undefined) {
    filter.username = req.body.username;
  }
  if (req.body.email !== undefined) {
    filter.email = req.body.email;
  }

  mongo_get(
    (result: any) => {
      if (result === null) {
        errorResponse(res, new ErrorResponse("Benutzer nicht gefunden", 404));
        return;
      }
      bcrypt.compare(req.body.password, result.password, (error, result2) => {
        if (error !== undefined) {
          errorResponse(
            res,
            new ErrorResponse("Fehler beim vergleichen der Passwörter", 500)
          );
          return;
        }
        if (result2) {
          delete result.password;
          const token = jwt.sign({ user: result }, process.env.PRIVATE_KEY, {
            expiresIn: "12h",
          });
          successResponse(res, new SuccessResponse({ jwt: token }));
        } else {
          errorResponse(res, new ErrorResponse("Falsches Passwort", 401));
          return;
        }
      });
    },
    res.locals.collection,
    filter
  );
});

router.post("/exists", (req, res) => {
    mongo_get(
        (result: any) => {
            if (result === null) {
                errorResponse(res, new ErrorResponse("Benutzer nicht gefunden", 404));
                return;
            }
            successResponse(res, new SuccessResponse());
        },
        res.locals.collection,
        req.body
    );
});

router.get("/:id/classes", (req, res) => {
  mongo_get_all(
    (result: any) => {
      if (result === null) {
        new ErrorResponse("Benutzer nicht gefunden", 404).throw(res);
        return;
      }
      const resData: (number | string)[] = [];
      result.forEach(
        (dataSet: { user: number | string; class: number | string }) => {
          resData.push(dataSet.class);
        }
      );
      new SuccessResponse(resData).throw(res);
    },
    getDatabase().collection("user_in_class"),
    {
      user: req.params.id,
    }
  );
});

router.get("/:id/courses", (req, res) => {
  mongo_get_all(
    (result: any) => {
      if (result === null) {
        new ErrorResponse("Benutzer nicht gefunden", 404).throw(res);
        return;
      }
      const resData: (number | string)[] = [];
      result.forEach(
        (dataSet: { user: number | string; course: number | string }) => {
          resData.push(dataSet.course);
        }
      );
      new SuccessResponse(resData).throw(res);
    },
    getDatabase().collection("user_in_course"),
    {
      user: req.params.id,
    }
  );
});

attach_default_routes(router);

export default router;
