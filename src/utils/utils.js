import {MONTH_NAMES} from "../const";

const DATE_MAX_RANGE = 100;

/**
 * Returns random array element
 * @param {Array} array - array to return element from
 * @return {*} - random element of the array
 */
const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length)];

/**
 * Returns random integer between min (inclusive) and max (exclusive) values
 * @param {Number} min - min value
 * @param {Number} max - max value
 * @return {Number} - random integer number
 */
const getRandomInteger = (min = 0, max = 10) => min + Math.floor((max - min) * Math.random());

/**
 * Returns random date that lies within the given range from the current date
 * @param {Number} range - range from the current date
 * @return {Date} - random date
 */
const getRandomDate = (range = DATE_MAX_RANGE) => {
  const targetDate = new Date();
  const diffValue = getRandomInteger(0, range);

  targetDate.setDate(targetDate.getDate() - diffValue); // TODO: is it correct?

  return targetDate;
};

/**
 * Returns random boolean value (true or false)
 * @return {Boolean} - random true or false
 */
const getRandomBoolean = () => Math.random() > 0.5;

/**
 * Formates date to string
 * @param {Date} date - date object
 * @return {String} - formated date
 */
const formatDate = (date) => `${formatNumber(date.getDate())} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;

/**
 *Formats given integer number by addig leading zero if it contains only one digit
 * @param {Number} num - integer to be formatted
 * @return {String} - formatted value
 */
const formatNumber = (num) => num < 10 ? `0${num}` : `${num}`;

export {
  getRandomArrayItem,
  getRandomDate,
  getRandomInteger,
  getRandomBoolean,
  formatDate
};
