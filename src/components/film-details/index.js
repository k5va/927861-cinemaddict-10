import AbstractSmartComponent from "../smart-component";
import {template} from "./template";
import {CommentEmojiImages} from "../../consts";

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._subscribeOnEvents();
    this._commentEmojiImage = null;
  }

  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template(this._film, {commentEmojiImage: this._commentEmojiImage});
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
   * Sets add to watched handler function.
   * @param {Function} handler - handler
   */
  setAddToWatchedHandler(handler) {
    this
      .getElement()
      .querySelector(`.film-details__control-input--watched`)
      .addEventListener(`change`, handler);
  }

  /**
   * Sets add to Favorites handler function.
   * @param {Function} handler - handler
   */
  setAddToFavoritesHandler(handler) {
    this
      .getElement()
      .querySelector(`.film-details__control-input--favorite`)
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

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  /**
   * Addes component's interactive controls events handlers
   */
  _subscribeOnEvents() {
    this
      .getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, (evt) => {
        this._commentEmojiImage = CommentEmojiImages[evt.target.value];
        this.rerender();
      });
  }
}
