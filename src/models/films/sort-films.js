import {SortType} from "../../consts";

/**
 * Returns sorted copy of given films array with respect to sort type
 * @param {Array<*>} films - array of films
 * @param {*} sortType - sort type
 * @return {Array<*>} - array of sorted films
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
