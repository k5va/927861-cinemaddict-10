import {createFilmCardTemplate} from "./film-card";
import {TOP_RATED_FILMS_COUNT, MOST_COMMENTED_FILMS_COUNT} from "../const";
import Component from "./component";

/**
 * Creates films list markup
 * @param {Array<*>} films - array of films
 * @return {String} - films list markup
 */
const createFilmsListMarkup = (films) => films
  .map((film) => createFilmCardTemplate(film))
  .join(``);

/**
* Filters through films array to find top rated
* @param {Array<*>} films - array of films
* @return {Array<*>} - array of top rated films
*/
const findTopRatedFilms = (films) => films
  .filter((film) => film.rating > 0)
  .sort((film1, film2) => film2.rating - film1.rating)
  .slice(0, TOP_RATED_FILMS_COUNT);

/**
 * Filters through films array to find most commented
 * @param {Array<*>} films - array of films
 * @return {Array<*>} - array of most commented films
 */
const findMostCommentedFilms = (films) => films
  .filter((film) => film.comments.length > 0)
  .sort((film1, film2) => film2.comments.length - film1.comments.length)
  .slice(0, MOST_COMMENTED_FILMS_COUNT);

/**
 * Creates films template
 * @param {Array<*>} films - array of films
 * @return {String} template
 */
export const createFilmsTemplate = (films) => {
  const topRatedFilms = findTopRatedFilms(films);
  const topRatedFilmsMarkup = createFilmsListMarkup(topRatedFilms);

  const mostCommentedFilms = findMostCommentedFilms(films);
  const mostCommentedFilmsMarkup = createFilmsListMarkup(mostCommentedFilms);

  return `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    <div class="films-list__container"></div>

  </section>

  ${topRatedFilms.length > 0 ? `<section class="films-list--extra films-list--top-rated">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">${topRatedFilmsMarkup}</div>
    </section>` : ``}

  ${mostCommentedFilms.length > 0 ? `<section class="films-list--extra films-list--most-commented">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">${mostCommentedFilmsMarkup}</div>
    </section>` : ``}

</section>`;
};

export default class Films extends Component {
  constructor(films) {
    super(createFilmsTemplate(films));
  }
}
