import express from "express";
import {attach_default_routes, init_router} from "../utils/utils";

const router = init_router("feedbacks");
attach_default_routes(router);

export default router;