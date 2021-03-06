import moment from "moment";

/**
 * Formats given date as time passed since now
 * @param {Date} date - date to be formatted
 * @return {String} - formatted date
 */
const formatDateFromNow = (date) => {
  const momentDate = moment(date);
  const momentNow = moment();

  if (momentNow.diff(momentDate, `seconds`) < 60) {
    return `now`;
  }

  if (momentNow.diff(momentDate, `minutes`) < 4) {
    return `a minute ago`;
  }

  if (momentNow.diff(momentDate, `minutes`) < 60) {
    return `a few minutes ago`;
  }

  if (momentNow.diff(momentDate, `hours`) < 2) {
    return `a hour ago`;
  }

  if (momentNow.diff(momentDate, `hours`) < 24) {
    return `a few hours ago`;
  }

  if (momentNow.diff(momentDate, `days`) < 2) {
    return `a day ago`;
  }

  return `a ${momentNow.diff(momentDate, `days`)} days ago`;
};

export {formatDateFromNow};
