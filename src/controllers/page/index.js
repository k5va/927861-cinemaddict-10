import {
  FilmsComponent, NoFilmsComponent, ShowMoreComponent,
  SortComponent, TopRatedFilmsComponent, MostCommentedFilmsComponent}
  from "../../components";
import {render, RenderPosition} from "../../utils";
import FilmController from "../film";
import {FILMS_PER_LOAD} from "../../consts";

export default class PageController {
  /**
   * Creates an instance of FilmsController.
   * @param {HTMLElement} container - parent HTML Element to render data to
   * @param {FilmsModel} filmsModel - films model
   */
  constructor(container, filmsModel) {
    this._container = container;

    this._filmsModel = filmsModel;
    this._showingFilmControllers = [];
    this._showingFilmsCount = FILMS_PER_LOAD;

    this._filmsComponent = new FilmsComponent();
    this._showMoreComponent = new ShowMoreComponent();
    this._sortComponent = new SortComponent();
    this._topRatedFilmsComponent = new TopRatedFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  /**
   * Renders given films
   */
  render() {

    const films = this._filmsModel.getFilms();

    if (!films.length) {
      // render No-films
      render(this._container, new NoFilmsComponent());
      return;
    }

    // render sort
    render(this._container, this._sortComponent);
    // render films list
    render(this._container, this._filmsComponent);
    this._showingFilmControllers = this._showingFilmControllers.concat(
        this._renderFilms(this._filmsComponent, films.slice(0, this._showingFilmsCount))
    );

    this._renderShowMore();
    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
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
              this._showingFilmsCount + FILMS_PER_LOAD)
          )
      );
      // update rendered films counter and check if there are more films to load
      this._showingFilmsCount += FILMS_PER_LOAD;
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
    render(this._filmsComponent.getElement(), this._topRatedFilmsComponent);
    this._renderFilms(this._topRatedFilmsComponent, this._filmsModel.getTopRatedFilms());
  }

  /**
   * Renders most commented films block
   */
  _renderMostCommentedFilms() {
    render(this._filmsComponent.getElement(), this._mostCommentedFilmsComponent);
    this._renderFilms(this._mostCommentedFilmsComponent, this._filmsModel.getMostCommentedFilms());
  }


  /**
   * Renders films
   * @param {Component} container - parent component with list
   * @param {Array<*>} films - array of films
   * @return {Array<FilmController>} - array of corresponding film controllers
   */
  _renderFilms(container, films) {
    return films.map((film) => {
      const filmController = new FilmController(container, this._onDataChange, this._onViewChange);
      filmController.render(film);

      return filmController;
    });
  }

  /**
   * Sort type change handler
   * @param {String} sortType - sort type
   */
  _onSortTypeChange(sortType) {
    this._filmsModel.setSortType(sortType);
    this._updateFilmsList();
  }

  /**
   * Film change handler
   * @param {filmController} filmController - film controller, that correspondes to film
   * @param {*} oldData - old data
   * @param {*} newData - new (changed) data
   */
  _onDataChange(filmController, oldData, newData) { // TODO: think it over
    if (oldData === null) { // add new comment
      this._filmsModel.addFilmComment(newData.filmId, newData);
      return;
    }

    if (newData === null) { // delete comment
      this._filmsModel.deleteFilmComment(oldData.id, oldData.deletedCommentId);
      return;
    }

    if (oldData && newData) { // update film
      this._filmsModel.updateFilm(oldData.id, newData);
      filmController.render(newData);
      return;
    }
  }

  /**
   * Handles film controller's switch to edit mode
   */
  _onViewChange() {
    this._showingFilmControllers.forEach((filmController) => filmController.setDefaultView());
  }

  /**
   * Model's filter change handler
   */
  _onFilterChange() {
    this._updateFilmsList();
  }

  /**
 * Rerenders films list
 */
  _updateFilmsList() {
    this._filmsComponent.resetList();
    this._showMoreComponent.removeElement();
    this._showingFilmsCount = FILMS_PER_LOAD;

    this._showingFilmControllers = this._renderFilms(
        this._filmsComponent,
        this._filmsModel.getFilms().slice(0, this._showingFilmsCount)
    );
    this._renderShowMore();
  }
}
