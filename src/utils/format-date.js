import moment from "moment";

/**
 * Formates date to string
 * @param {Date} date - date object
 * @param {String} format - date format
 * @return {String} - formated date
 */
const formatDate = (date, format = `DD MMMM YYYY`) => moment(date).format(format);

export {formatDate};
