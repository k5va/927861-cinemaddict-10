import AbstractComponent from "../component";
import {template} from "./template";

export default class FilmDetails extends AbstractComponent {
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
    this
      .getElement()
      .querySelector(`.film-details__control-input--watchlist`)
      .addEventListener(`change`, handler);
  }


  /**
   * Sets film details close handler
   * @param {Function} handler - close handler
   */
  setCloseHandler(handler) {
    this
      .getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }
}
