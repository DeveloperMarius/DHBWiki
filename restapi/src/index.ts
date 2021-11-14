import express from "express";
import compression from "compression";
import expressValidator from "express-validator";
import bodyParser from "body-parser";
import {initDatabase} from "./database";
import cors from "cors";
import fileUpload from "express-fileupload";

import areaRoutes from "./routes/area";
import classRoutes from "./routes/class";
import classTypeRoutes from "./routes/class_type";
import courseRoutes from "./routes/course";
import fileRoutes from "./routes/file";
import fileCommentRoutes from "./routes/file_comment";
import passwordResetTokenRoutes from "./routes/password_reset_token";
import userRoutes from "./routes/user";
import {AnyError, Db} from "mongodb";
const app = express();
const port = 8080;
const router = express.Router();

router.get("/", (req, res) => {
    res.send( "Hello world!" );
});

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator());

app.use("/", router);
app.use("/api/area", areaRoutes);
app.use("/api/class", classRoutes);
app.use("/api/class/type", classTypeRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/file/comment", fileCommentRoutes);
app.use("/api/user/password_reset", passwordResetTokenRoutes);
app.use("/api/user", userRoutes);

initDatabase((error: AnyError|null, db: Db) => {
    if(error){
        throw error;
    }

    app.listen(port, () => {
        console.log(`server started at http://localhost:${ port }`);
    });
})