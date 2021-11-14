import express from "express";
import {attach_default_routes} from "../utils/utils";

const router = express.Router();

attach_default_routes(router, "password_reset_tokens");

export default router;