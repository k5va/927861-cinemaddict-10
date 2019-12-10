import {MONTH_NAMES} from "../consts";
import {formatNumber} from "./index";

/**
 * Formates date to string
 * @param {Date} date - date object
 * @return {String} - formated date
 */
const formatDate = (date) => `${formatNumber(date.getDate())} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;

export {formatDate};
