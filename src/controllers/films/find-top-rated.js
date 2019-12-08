import {TOP_RATED_FILMS_COUNT} from "../../const";

/**
* Filters through films array to find top rated
* @param {Array<*>} films - array of films
* @return {Array<*>} - array of top rated films
*/
const findTopRatedFilms = (films) => films
  .filter((film) => film.rating > 0)
  .sort((film1, film2) => film2.rating - film1.rating)
  .slice(0, TOP_RATED_FILMS_COUNT);

export {findTopRatedFilms};
