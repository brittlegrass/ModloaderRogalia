import { formatDate } from "./Date.js";
import { writeToFile } from "./FileSystem.js";

/**
 * Writes logMessage to log file at '/modlogs/{date}.log'
 * @param {string} logMessage - text to write into logs
 * @param {string} [logTitle=ERROR] - title for log entry, any string
 */
export const writeLog = (logMessage, logTitle = 'ERROR') => {
    if (typeof logMessage !== 'string') {
        return;
    }
    const timestamp = formatDate('m/d/Y H:i:s')

    const fileName = formatDate('m_d_Y');
    const filePath = `./modlogs/${fileName}.log`;
    writeToFile(`[${timestamp}] ${logTitle}: ${logMessage}\n`, filePath);
};
