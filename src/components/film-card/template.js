import {FILM_GENRE_SPLIT, MAX_SHORT_DESCRIPTION_SIZE} from "../../consts";

/**
 * Creates film card template
 * @param {*} film - film data
 * @return {String} template
 */
const template = (film) => {
  const {title, rating, releaseDate, duration, poster, genres,
    description, comments, isFavorite, isWatched, isWatchlistAdded} = film;

  const genreText = [...genres].join(FILM_GENRE_SPLIT);
  const shortDescription = description.length > MAX_SHORT_DESCRIPTION_SIZE ?
    `${description.slice(0, MAX_SHORT_DESCRIPTION_SIZE)}...` :
    description;

  return (
    `<article class="film-card">
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
        <button
          class="film-card__controls-item button film-card__controls-item--add-to-watchlist
          ${isWatchlistAdded ? `film-card__controls-item--active` : ``}">
          Add to watchlist
        </button>
        <button
          class="film-card__controls-item button film-card__controls-item--mark-as-watched
          ${isWatched ? `film-card__controls-item--active` : ``}">
          Mark as watched
        </button>
        <button
          class="film-card__controls-item button film-card__controls-item--favorite
          ${isFavorite ? `film-card__controls-item--active` : ``}">
          Mark as favorite
        </button>
      </form>
    </article>`);
};

export {template};
