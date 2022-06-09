import express from "express";
import compression from "compression";
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
import testRoutes from "./routes/test";
import feedbackRoutes from "./routes/feedback";
import calendarRoutes from "./routes/calendar";
import {AnyError, Db} from "mongodb";
import {config as dotenvConfig} from "dotenv";

const app = express();
const port = 4001;
const router = express.Router();

const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
};


router.get("/", (req, res) => {
    res.send( "Hello world!" );
});

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors(options));
router.use(cors(options));
router.options('*', cors(options));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenvConfig({
    path: __dirname + '/../res/.env'
});

app.use("/", router);
app.use("/api/area", areaRoutes);
app.use("/api/class", classRoutes);
app.use("/api/class/type", classTypeRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/file/comment", fileCommentRoutes);
app.use("/api/user/password_reset", passwordResetTokenRoutes);
app.use("/api/user", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/test", testRoutes);
app.use("/api/calendar", calendarRoutes);

initDatabase((error: AnyError|null, db: Db) => {
    if(error){
        console.error("Fehler beim herstellen der Verbindung zur Datenbank!\n", error.stack);
        // throw error;
    }

    app.listen(port, () => {
        console.log(`Server started at http://localhost:${ port }`);
    });
})