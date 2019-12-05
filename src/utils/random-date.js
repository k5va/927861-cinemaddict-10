import {getRandomInteger} from "./index";

const DATE_MAX_RANGE = 100;

/**
 * Returns random date that lies within the given range from the current date
 * @param {Number} range - range from the current date
 * @return {Date} - random date
 */
const getRandomDate = (range = DATE_MAX_RANGE) => {
  const targetDate = new Date();
  const diffValue = getRandomInteger(0, range);

  targetDate.setDate(targetDate.getDate() - diffValue);

  return targetDate;
};

export {getRandomDate};
