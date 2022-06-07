import express from "express";
import {getDatabase, initDatabase} from "../database";
import {SuccessResponse, successResponse} from "../utils/success_response";

const router = express.Router();
router.get('/status', (req, res) => {
    const database = getDatabase(false)
    successResponse(res, new SuccessResponse({
        database: !!database
    }))
});

export default router;