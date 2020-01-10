import AbstractSmartComponent from "../smart-component";
import {template} from "./template";
import {NO_USER_RATING} from "../../consts";

const DELETING_COMMENT_TEXT = `Deleting...`;
const DELETE_COMMENT_TEXT = `Delete`;

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._commentEmoji = null;
    this._commentText = null;
    this._userRating = NO_USER_RATING;
    this._deletingCommentId = null;
    this._isLocked = false;

    this._addToWatchListHandler = null;
    this._addToWatchedHandler = null;
    this._addToFavoritesHandler = null;
    this._closeHandler = null;
    this._userRatingChangeHandler = null;
    this._addCommentHandler = null;
    this._deleteCommentHandler = null;

    this._subscribeOnInternalEvents();
  }

  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template(this._film, {
      commentEmoji: this._commentEmoji,
      commentText: this._commentText,
      deleteCommentText: DELETE_COMMENT_TEXT
    });
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
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, (evt) => {
        if (this._isLocked) {
          return;
        }

        evt.preventDefault();
        this._addToWatchListHandler();
      });
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
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, (evt) => {
        if (this._isLocked) {
          return;
        }

        evt.preventDefault();
        this._addToWatchedHandler();
      });
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
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, (evt) => {
        if (this._isLocked) {
          return;
        }

        evt.preventDefault();
        this._addToFavoritesHandler();
      });
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
    this._recoverUserRatingChangeHandler();
  }

  _recoverUserRatingChangeHandler() {
    if (this._film.isWatched) {
      // user rating change
      this
        .getElement()
        .querySelector(`.film-details__user-rating-score`)
        .addEventListener(`click`, (evt) => {
          evt.preventDefault();
          if (!evt.target.classList.contains(`film-details__user-rating-label`) || this._isLocked) {
            return;
          }
          this._userRating = this.getElement().querySelector(`#${evt.target.htmlFor}`).value;
          this._userRatingChangeHandler(this._userRating);
        });
      // user rating reset
      this
        .getElement()
        .querySelector(`.film-details__watched-reset`)
        .addEventListener(`click`, () => {
          if (this._isLocked) {
            return;
          }

          this._userRating = NO_USER_RATING;
          this._userRatingChangeHandler(this._userRating);
        });
    }
  }

  /**
   * Sets add comment handler
   * @param {Function} handler - handler
   */
  setAddCommentHandler(handler) {
    this._addCommentHandler = handler;
    this._recoverAddCommentHandler();
  }

  _recoverAddCommentHandler() {
    if (!this._addCommentHandler) {
      return;
    }

    this
      .getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (evt) => {
        const isCtrlEnterKey = evt.key === `Enter` && evt.ctrlKey;
        if (isCtrlEnterKey && this._commentEmoji && evt.target.value.length > 0 && !this._isLocked) {
          this._addCommentHandler({
            text: evt.target.value,
            date: new Date(),
            emoji: this._commentEmoji
          });
        }
      });
  }

  /**
   * Sets delete comment handler
   * @param {Function} handler - handler
   */
  setDeleteCommentHandler(handler) {
    this._deleteCommentHandler = handler;
    this._recoverDeleteCommentHandler();
  }

  _recoverDeleteCommentHandler() {
    this
      .getElement()
      .querySelector(`.film-details__comments-list`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        if (!evt.target.classList.contains(`film-details__comment-delete`) || this._isLocked) {
          return;
        }
        evt.target.innerText = DELETING_COMMENT_TEXT;
        this._deletingCommentId = evt.target.dataset.commentId;
        this._deleteCommentHandler(this._deletingCommentId);
      });
  }

  recoverListeners() {
    this._subscribeOnInternalEvents();

    this._recoverCloseHandler();
    this._recoverAddToWatchedHandler();
    this._recoverAddtoWatchListHandler();
    this._recoverCloseHandler();
    this._recoverUserRatingChangeHandler();
    this._recoverAddCommentHandler();
    this._recoverDeleteCommentHandler();
  }

  /**
   * Addes component's interactive controls events handlers
   */
  _subscribeOnInternalEvents() {
    this
      .getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, (evt) => {
        if (this._isLocked) {
          return;
        }

        this._commentEmoji = evt.target.value;
        this._commentText = this.getElement().querySelector(`.film-details__comment-input`).value;
        this.rerender();
      });
  }

  lock() {
    this._isLocked = true;
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .disabled = true;

    [...this.getElement().querySelectorAll(`.film-details__comment-delete`)]
      .forEach((element) => {
        element.disabled = true;
      });
  }

  unlock() {
    this._isLocked = false;
    this.getElement().querySelector(`.film-details__comment-input`).disabled = false;

    [...this.getElement().querySelectorAll(`.film-details__comment-delete`)]
      .forEach((element) => {
        element.disabled = false;
      });
  }

  onAddCommentError() {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .classList
      .add(`film-details__comment-input-error`);
  }

  onChangeRatingError() {
    if (this._userRating === NO_USER_RATING) {
      return;
    }

    this.getElement()
      .querySelector(`#rating-${this._userRating}`)
      .classList
      .add(`film-details__user-rating-input-error`);
  }

  onDeleteCommentError() {
    this.getElement()
      .querySelector(`.film-details__comment-delete[data-comment-id="${this._deletingCommentId}"]`)
      .innerText = DELETE_COMMENT_TEXT;
  }
}
