import {init_router} from "../utils/utils";
import axios from "axios";
import ICalParser, { EventJSON } from "ical-js-parser";
import {SuccessResponse, successResponse} from "../utils/success_response";
import moment from "moment";

const router = init_router();
router.get('/tomorrow', async (req, res) => {
    const url = 'http://vorlesungsplan.dhbw-mannheim.de/ical.php?uid=8321001';
    const response = await axios.get(url);
    const icalString = response.data;
    const resultJSON = ICalParser.toJSON(icalString);
    const events = resultJSON.events;
    const found: EventJSON[] = [];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    events.forEach((event) => {
        if(moment(event.dtstart.value).isSame(tomorrow, "day")){
            found.push(event);
        }
    })
    successResponse(res, new SuccessResponse({
        events: found
    }));
});

export default router;