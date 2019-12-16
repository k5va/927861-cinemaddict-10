const MIN_DATE_THRESHOLD = new Date(`1950-01-01`);

/**
 * Returns random date within the given min date and now
 * @param {Number} minDate - range from the current date
 * @return {Date} - random date
 */
const getRandomDate = (minDate = MIN_DATE_THRESHOLD) => new Date(minDate.getTime()
  + Math.random() * (new Date().getTime() - minDate.getTime()));

export {getRandomDate};
