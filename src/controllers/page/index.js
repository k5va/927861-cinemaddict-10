import {
  FilmsComponent, ShowMoreComponent, SortComponent,
  TopRatedFilmsComponent, MostCommentedFilmsComponent}
  from "../../components";
import {render, RenderPosition} from "../../utils";
import FilmController, {FilmAction, FilmMode} from "../film";
import {FILMS_ON_PAGE} from "../../consts";

const FilmsListTitle = {
  NO_FILMS: `There are no movies in our database`,
  LOADING: `Loading...`
};

export default class PageController {
  /**
   * Creates an instance of FilmsController.
   * @param {HTMLElement} container - parent HTML Element to render data to
   * @param {FilmsModel} filmsModel - films model
   * @param {API} api - api
   */
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;

    this._showingFilmControllers = [];
    this._topRatedFilmControllers = [];
    this._mostCommentedFilmControllers = [];
    this._showingFilmsCount = FILMS_ON_PAGE;
    this._openedFilmController = null;

    this._filmsComponent = null;
    this._showMoreComponent = new ShowMoreComponent();
    this._sortComponent = new SortComponent();
    this._topRatedFilmsComponent = new TopRatedFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
    this._noFilmsComponent = null;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    this._filmsModel.setFilterChangeHandler(this._filterChangeHandler);
  }

  /**
   * Renders films
   * @param {Boolean} isDataLoaded - true if data is loaded from server
   */
  render(isDataLoaded = true) {

    if (!this._filmsComponent) {
      render(this._container, this._sortComponent);
      this._filmsComponent = new FilmsComponent();
      render(this._container, this._filmsComponent);
    }

    if (!isDataLoaded) {
      this._filmsComponent.setTitle(FilmsListTitle.LOADING);
      return;
    }

    if (this._filmsModel.getFilms().length > 0 || this._openedFilmController) {
      this._filmsComponent.resetTitle();
    } else {
      this._filmsComponent.setTitle(FilmsListTitle.NO_FILMS);
    }

    if (!this._openedFilmController) {
      this._updateFilmsList();
      this._renderTopRatedFilms();
      this._renderMostCommentedFilms();
    }
  }

  /**
   * Show films
   */
  show() {
    this._sortComponent.show();
    this._filmsComponent.show();
  }

  /**
   * Hide films
   */
  hide() {
    this._sortComponent.hide();
    this._filmsComponent.hide();
  }

  /**
   * Renders show more
   */
  _renderShowMore() {
    const films = this._filmsModel.getFilms();

    if (this._showingFilmsCount >= films.length) {
      // no more films to show
      this._showMoreComponent.removeElement();
      return;
    }

    render(this._filmsComponent.getListContainer(), this._showMoreComponent, RenderPosition.AFTER_END);
    this._showMoreComponent.setShowMoreHandler(() => {
      // render new portion of films
      this._showingFilmControllers = this._showingFilmControllers.concat(
          this._renderFilms(this._filmsComponent, films.slice(
              this._showingFilmsCount,
              this._showingFilmsCount + FILMS_ON_PAGE)
          )
      );
      // update rendered films counter and check if there are more films to load
      this._showingFilmsCount += FILMS_ON_PAGE;
      if (this._showingFilmsCount >= films.length) {
        // no more tasks to load
        this._showMoreComponent.removeElement();
      }
    });
  }

  /**
   * Renders top rated films block
   */
  _renderTopRatedFilms() {
    this._topRatedFilmsComponent.resetList();
    render(this._filmsComponent.getElement(), this._topRatedFilmsComponent);
    this._topRatedFilmControllers = this._renderFilms(
        this._topRatedFilmsComponent,
        this._filmsModel.getTopRatedFilms()
    );
  }

  /**
   * Renders most commented films block
   */
  _renderMostCommentedFilms() {
    this._mostCommentedFilmsComponent.resetList();
    render(this._filmsComponent.getElement(), this._mostCommentedFilmsComponent);
    this._mostCommentedFilmControllers = this._renderFilms(
        this._mostCommentedFilmsComponent,
        this._filmsModel.getMostCommentedFilms()
    );
  }

  /**
   * Renders films
   * @param {Component} container - parent component with list
   * @param {Array<*>} films - array of films
   * @return {Array<FilmController>} - array of corresponding film controllers
   */
  _renderFilms(container, films) {
    return films.map((film) => {
      const filmController = new FilmController(container, this._dataChangeHandler, this._viewChangeHandler);
      filmController.render(film);

      return filmController;
    });
  }

  /**
   * Sort type change handler
   * @param {String} sortType - sort type
   */
  _sortTypeChangeHandler(sortType) {
    this._filmsModel.setSortType(sortType);
    this._updateFilmsList();
  }

  /**
   * Film change handler
   */
  _dataChangeHandler({action, controller, id, payload}) {
    switch (action) {
      case FilmAction.ADD_COMMENT:
        this._api
          .createComment(id, payload)
          .then((film) => this._renderFilmControllers(this._filmsModel.updateFilm(id, film)))
          .catch(() => controller.handleError(action));
        return;
      case FilmAction.DELETE_COMMENT:
        this._api
          .deleteComment(payload)
          .then((commentId) => this._renderFilmControllers(this._filmsModel.deleteFilmComment(id, commentId)))
          .catch(() => controller.handleError(action));
        return;
      case FilmAction.UPDATE_FILM:
      case FilmAction.CHANGE_RATING:
        this._api
          .updateFilm(payload)
          .then((film) => this._renderFilmControllers(this._filmsModel.updateFilm(id, film)))
          .catch(() => controller.handleError(action));
        return;
      default:
        throw new Error(`Unsupported film action`);
    }
  }

  /**
   * Finds all film controllers that corresponds to fiven film and calls render on them
   * @param {Object} film - film object
   */
  _renderFilmControllers(film) {
    [...this._showingFilmControllers, ...this._topRatedFilmControllers, ...this._mostCommentedFilmControllers]
      .filter((controller) => controller.getFilm().id === film.id)
      .forEach((controller) => controller.render(film));
  }

  /**
   * Handles film controller's mode change
   * @param {FilmController} controller - film controller
   */
  _viewChangeHandler(controller) {
    switch (controller.getMode()) {
      case FilmMode.DEFAULT:
      default:
        this._openedFilmController = null;
        this.render();
        return;
      case FilmMode.DETAILS:
        if (this._openedFilmController) {
          this._openedFilmController.setDefaultView();
        }
        this._openedFilmController = controller;
        return;
    }
  }

  /**
   * Model's filter change handler
   */
  _filterChangeHandler() {
    this.render();
  }

  /**
 * Rerenders films list
 */
  _updateFilmsList() {
    this._filmsComponent.resetList();
    this._showMoreComponent.removeElement();
    this._showingFilmsCount = FILMS_ON_PAGE;

    this._showingFilmControllers = this._renderFilms(
        this._filmsComponent,
        this._filmsModel.getFilms().slice(0, this._showingFilmsCount)
    );
    this._renderShowMore();
  }
}
