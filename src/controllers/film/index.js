import {FilmComponent, FilmDetailsComponent} from "../../components";
import {render, replace} from "../../utils";
import {NO_USER_RATING} from "../../consts";

const FilmMode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export const FilmAction = {
  UPDATE_FILM: `update_film`,
  ADD_COMMENT: `add_comment`,
  DELETE_COMMENT: `delete_comment`
};

export default class FilmController {
  /**
  * Creates an instance of TaskController.
  * @param {FilmListComponent} container - container component to add films to
  * @param {Function} onDataChange - data change handler
  * @param {Function} onViewChange - view change handler
  */
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._film = null;
    this._mode = FilmMode.DEFAULT;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._showFilmDetails = this._showFilmDetails.bind(this);
    this._addToWatchListHandler = this._addToWatchListHandler.bind(this);
    this._addToWatchedHandler = this._addToWatchedHandler.bind(this);
    this._addToFavoritesHandler = this._addToFavoritesHandler.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
    this._userRatingChangeHandler = this._userRatingChangeHandler.bind(this);
    this._addCommentHandler = this._addCommentHandler.bind(this);
    this._deleteCommentHandler = this._deleteCommentHandler.bind(this);
  }

  /**
   * Renders given film a
   * @param {*} film - film object
   */
  render(film) {
    this._film = film;

    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = this._createFilmComponent(this._film);
    this._filmDetailsComponent = this._createFilmDetailsComponent(this._film);

    if (oldFilmComponent && oldFilmDetailsComponent) {
      this._filmComponent.enableHoverImitation();
      replace(this._filmComponent, oldFilmComponent);
      if (this._mode === FilmMode.DEFAULT) {
        this._filmComponent.disableHoverImitation();
      }

      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      // render film component
      render(this._container.getListContainer(), this._filmComponent);
    }
  }

  /**
   * Creates new film component with listeners
   * @param {*} film - film object
   * @return {FilmComponent} - film component
   */
  _createFilmComponent(film) {
    const filmComponent = new FilmComponent(film);
    // register add to watch list handler
    filmComponent.setAddToWatchlistHandler(this._addToWatchListHandler);
    // register add to watched handler
    filmComponent.setAddToWatchedHandler(this._addToWatchedHandler);
    // register add to favorites handler
    filmComponent.setAddToFavoritesHandler(this._addToFavoritesHandler);
    // register show film details handler
    filmComponent.setShowDetailsHandler(this._showFilmDetails);

    return filmComponent;
  }

  /**
   * Creates new film details component with listeners
   * @param {*} film - film object
   * @return {FilmDetailsComponent} - film component
   */
  _createFilmDetailsComponent(film) {
    const filmDetailsComponent = new FilmDetailsComponent(film);
    // register add to watch list handler
    filmDetailsComponent.setAddToWatchlistHandler(this._addToWatchListHandler);
    // register add to watched handler
    filmDetailsComponent.setAddToWatchedHandler(this._addToWatchedHandler);
    // register add to favorites handler
    filmDetailsComponent.setAddToFavoritesHandler(this._addToFavoritesHandler);
    // register film details close handler
    filmDetailsComponent.setCloseHandler(this._closeFilmDetails);
    // register user rating change handler
    filmDetailsComponent.setUserRatingChangeHandler(this._userRatingChangeHandler);
    // register add comment handler
    filmDetailsComponent.setAddCommentHandler(this._addCommentHandler);
    // register delete comment handler
    filmDetailsComponent.setDeleteCommentHandler(this._deleteCommentHandler);

    return filmDetailsComponent;
  }


  /**
  * Handler for Esc key down event
  * @param {KeyboardEvent} evt - event object
  */
  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Esc` || evt.key === `Escape`;

    if (isEscKey) {
      this._closeFilmDetails();
    }
  }

  /**
   * Shows film details info
   */
  _showFilmDetails() {

    if (this._mode === FilmMode.DETAILS) {
      return;
    }

    // fire view change event
    this._onViewChange();
    // create new film details component and render it
    this._filmDetailsComponent = this._createFilmDetailsComponent(this._film);
    render(null, this._filmDetailsComponent);
    this._filmComponent.enableHoverImitation();

    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = FilmMode.DETAILS;
  }


  /**
  * Closes film details info
  */
  _closeFilmDetails() {
    this._filmDetailsComponent.removeElement();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._filmComponent.disableHoverImitation();
    this._mode = FilmMode.DEFAULT;
  }

  /**
   * Sets controller to default view
   */
  setDefaultView() {
    if (this._mode !== FilmMode.DEFAULT) {
      this._closeFilmDetails();
    }
  }

  /**
   * Add film to watchlist handler
   */
  _addToWatchListHandler() {
    const newFilm = Object.assign({}, this._film, {isWatchlistAdded: !this._film.isWatchlistAdded});
    this._onDataChange({action: FilmAction.UPDATE_FILM, controller: this, id: this._film.id, payload: newFilm});
  }

  /**
   * Add film to watched handler
   */
  _addToWatchedHandler() {
    const newFilm = Object.assign({}, this._film, {isWatched: !this._film.isWatched});

    // reset user rating if film removed from watched list
    newFilm.userRating = !newFilm.isWatched ? NO_USER_RATING : newFilm.userRating;

    // call data change handler
    this._onDataChange({action: FilmAction.UPDATE_FILM, controller: this, id: this._film.id, payload: newFilm});
  }

  /**
  * Add film to favorites handler
  */
  _addToFavoritesHandler() {
    const newFilm = Object.assign({}, this._film, {isFavorite: !this._film.isFavorite});
    this._onDataChange({action: FilmAction.UPDATE_FILM, controller: this, id: this._film.id, payload: newFilm});
  }

  /**
  * Change user rating handler
  * @param {Number} userRating - new user rating
  */
  _userRatingChangeHandler(userRating) {
    const newFilm = Object.assign({}, this._film, {userRating: +userRating});
    this._onDataChange({action: FilmAction.UPDATE_FILM, controller: this, id: this._film.id, payload: newFilm});
  }

  /**
   * Add new comment handler
   * @param {Object} comment - comment
   */
  _addCommentHandler(comment) {
    this._onDataChange({action: FilmAction.ADD_COMMENT, controller: this, id: this._film.id, payload: comment});
  }

  /**
   * Delete comment handler
   * @param {String} commentId - comment id
   */
  _deleteCommentHandler(commentId) {
    this._onDataChange({action: FilmAction.DELETE_COMMENT, controller: this, id: this._film.id, payload: commentId});
  }
}
