import express from "express";
import {attach_default_routes} from "../utils/utils";

const router = express.Router();

attach_default_routes(router, "class_types");

export default router;