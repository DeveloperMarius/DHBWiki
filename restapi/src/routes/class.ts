import express from "express";
import {attach_default_routes, init_router} from "../utils/utils";

const router = init_router("classes");

attach_default_routes(router);

// TODO getCourses

export default router;