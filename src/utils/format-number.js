/**
 *Formats given integer number by addig leading zero if it contains only one digit
 * @param {Number} num - integer to be formatted
 * @return {String} - formatted value
 */
const formatNumber = (num) => num < 10 ? `0${num}` : `${num}`;

export {formatNumber};
