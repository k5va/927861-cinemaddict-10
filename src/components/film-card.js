import {FILM_GENRE_SPLIT, MAX_SHORT_DESCRIPTION_SIZE} from "../const";
import Component from "./component";

/**
 * Creates film card template
 * @param {*} film - film data
 * @return {String} template
 */
export const createFilmCardTemplate = (film) => {
  const {title, rating, releaseDate, duration, poster, genres, description, comments} = film;

  const genreText = [...genres].join(FILM_GENRE_SPLIT);
  const shortDescription = description.length > MAX_SHORT_DESCRIPTION_SIZE ?
    `${description.slice(0, MAX_SHORT_DESCRIPTION_SIZE)}...` :
    description;

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${releaseDate.getFullYear()}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genreText}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${shortDescription}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
  </form>
</article>`;
};

export default class LoadMore extends Component {
  constructor(film) {
    super(createFilmCardTemplate(film));
  }
}
