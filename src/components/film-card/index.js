import AbstractComponent from "../component";
import {template} from "./template";
import {debounce} from "../../utils";

export default class Film extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template(this._film);
  }

  /**
   * Sets add to Watchlist handler function.
   * @param {Function} handler - handler
   */
  setAddToWatchlistHandler(handler) {
    const addToWatchlistHandler = debounce(handler);
    this
      .getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        addToWatchlistHandler();
      });
  }

  /**
   * Sets add to watched handler function.
   * @param {Function} handler - handler
   */
  setAddToWatchedHandler(handler) {
    const addToWatchedHandler = debounce(handler);
    this
      .getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        addToWatchedHandler();
      });
  }

  /**
   * Sets add to Favorites handler function.
   * @param {Function} handler - handler
   */
  setAddToFavoritesHandler(handler) {
    const addToFavoritesHandler = debounce(handler);
    this
      .getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        addToFavoritesHandler();
      });
  }

  /**
   * Sets show film details handler function.
   * @param {Function} handler - handler
   */
  setShowDetailsHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  /**
   * Enables hover imitation
   */
  enableHoverImitation() {
    this.getElement().classList.add(`hover`);
  }

  /**
   * Disables hover imitation
   */
  disableHoverImitation() {
    this.getElement().classList.remove(`hover`);
  }
}
