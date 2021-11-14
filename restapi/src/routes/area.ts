import express from "express";
import {attach_default_routes} from "../utils/utils";

const router = express.Router();

attach_default_routes(router, "areas");

export default router;