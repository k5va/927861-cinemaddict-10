import {getRandomInteger} from "./random-integer";

/**
 * Returns random array element
 * @param {Array} array - array to return element from
 * @return {*} - random element of the array
 */
const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length)];

export {getRandomArrayItem};
