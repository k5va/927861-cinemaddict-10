import {MOST_COMMENTED_FILMS_COUNT} from "../../const";

/**
 * Filters through films array to find most commented
 * @param {Array<*>} films - array of films
 * @return {Array<*>} - array of most commented films
 */
const findMostCommentedFilms = (films) => films
  .filter((film) => film.comments.length > 0)
  .sort((film1, film2) => film2.comments.length - film1.comments.length)
  .slice(0, MOST_COMMENTED_FILMS_COUNT);

export {findMostCommentedFilms};
