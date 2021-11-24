import express from "express";
import {attach_default_routes, init_router} from "../utils/utils";

const router = init_router("class_types");

attach_default_routes(router);

export default router;