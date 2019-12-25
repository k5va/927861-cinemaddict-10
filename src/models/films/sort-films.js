import {SortType} from "../../consts";

/**
 * Returns sorted copy of given films array with respect to sort type
 * @param {Array<*>} films - array of films
 * @param {*} sortType - sort type
 * @return {Array<*>} - array of sorted films
 */
const sortFilms = (films, sortType) => {
  switch (sortType) {
    case SortType.DATE:
      return films.slice().sort((film1, film2) => film1.releaseDate - film2.releaseDate);
    case SortType.RATING:
      return films.slice().sort((film1, film2) => film2.rating - film1.rating);
    case SortType.DEFAULT:
    default:
      return films.slice();
  }
};

export {sortFilms};
