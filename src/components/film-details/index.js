import AbstractSmartComponent from "../smart-component";
import {template} from "./template";
import {CommentEmojiImages, NO_USER_RATING} from "../../consts";

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._commentEmojiImage = null;

    this._addToWatchListHandler = null;
    this._addToWatchedHandler = null;
    this._addToFavoritesHandler = null;
    this._closeHandler = null;
    this._userRatingChangeHandler = null;

    this._subscribeOnInternalEvents();
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
    this._addToWatchListHandler = handler;
    this._recoverAddtoWatchListHandler();
  }

  _recoverAddtoWatchListHandler() {
    this
      .getElement()
      .querySelector(`.film-details__control-input--watchlist`)
      .addEventListener(`change`, this._addToWatchListHandler);
  }

  /**
   * Sets add to watched handler function.
   * @param {Function} handler - handler
   */
  setAddToWatchedHandler(handler) {
    this._addToWatchedHandler = handler;
    this._recoverAddToWatchedHandler();
  }

  _recoverAddToWatchedHandler() {
    this
      .getElement()
      .querySelector(`.film-details__control-input--watched`)
      .addEventListener(`change`, this._addToWatchedHandler);
  }

  /**
   * Sets add to Favorites handler function.
   * @param {Function} handler - handler
   */
  setAddToFavoritesHandler(handler) {
    this._addToFavoritesHandler = handler;
    this._recoverAddToFavoritesHandler();
  }

  _recoverAddToFavoritesHandler() {
    this
      .getElement()
      .querySelector(`.film-details__control-input--favorite`)
      .addEventListener(`change`, this._addToFavoritesHandler);
  }

  /**
   * Sets film details close handler
   * @param {Function} handler - close handler
   */
  setCloseHandler(handler) {
    this._closeHandler = handler;
    this._recoverCloseHandler();
  }

  _recoverCloseHandler() {
    this
      .getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._closeHandler);
  }

  /**
   * Sets user rating change handler
   * @param {Function} handler - handler
   */
  setUserRatingChangeHandler(handler) {
    this._userRatingChangeHandler = handler;
    this._recoverUserRatingChangeHadler();
  }

  _recoverUserRatingChangeHadler() {
    if (this._film.isWatched) {
      // user rating change
      this
        .getElement()
        .querySelector(`.film-details__user-rating-score`)
        .addEventListener(`change`, (evt) => {
          evt.preventDefault();
          if (!evt.target.classList.contains(`film-details__user-rating-input`)) {
            return;
          }

          this._userRatingChangeHandler(evt.target.value);
        });
      // user rating reset
      this
        .getElement()
        .querySelector(`.film-details__watched-reset`)
        .addEventListener(`click`, () => {
          this._userRatingChangeHandler(NO_USER_RATING);
        });
    }
  }

  recoverListeners() {
    this._subscribeOnInternalEvents();

    this._recoverCloseHandler();
    this._recoverAddToWatchedHandler();
    this._recoverAddtoWatchListHandler();
    this._recoverCloseHandler();
    this._recoverUserRatingChangeHadler();
  }

  /**
   * Addes component's interactive controls events handlers
   */
  _subscribeOnInternalEvents() {
    this
      .getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, (evt) => {
        this._commentEmojiImage = CommentEmojiImages[evt.target.value];
        this.rerender();
      });
  }
}
