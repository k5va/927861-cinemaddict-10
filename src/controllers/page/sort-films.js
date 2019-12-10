import {SortType} from "../../consts";

/**
 * Sorts given films array with respect to sort type
 * @param {Array<*>} films - array of films
 * @param {String} sortType - sort type
 * @return {Array<*>} - sorted copy of array of films
 */
const sortFilms = (films, sortType) => {
  let sortedFilms = [];

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = films.slice().sort((film1, film2) => film1.releaseDate - film2.releaseDate);
      break;
    case SortType.RATING:
      sortedFilms = films.slice().sort((film1, film2) => film2.rating - film1.rating);
      break;
    case SortType.DEFAULT:
    default:
      sortedFilms = films.slice();
      break;
  }

  return sortedFilms;
};

export {sortFilms};
