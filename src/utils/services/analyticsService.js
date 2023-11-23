import {app} from "../helpers/firebase";
import {getAnalytics, logEvent} from "firebase/analytics";

const analytics = getAnalytics(app);

/**
 *
 * @param {string} message
 * @returns {Promise<void|User>}
 */
const logToAnalytics = async (message) => {

}

export {logToAnalytics};