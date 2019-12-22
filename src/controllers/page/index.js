import {FilmsComponent, NoFilmsComponent, ShowMoreComponent, SortComponent} from "../../components";
import {render, RenderPosition} from "../../utils";
import {renderTopRatedFilms} from "./render-top-rated";
import {renderMostCommentedFilms} from "./render-most-commented";
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
        this._renderFilms(films.slice(0, this._showingFilmsCount))
    );

    // render show more button
    this._renderShowMore();

    // render top rated films
    renderTopRatedFilms(this._filmsComponent.getElement(), this._filmsModel.getFilmsAll()); // TODO: get films from model
    // render most commented films
    renderMostCommentedFilms(this._filmsComponent.getElement(), this._filmsModel.getFilmsAll()); // TODO: get films from model
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
          this._renderFilms(films.slice(
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
   * Renders films
   * @param {Array<*>} films - array of films
   * @return {Array<FilmController>} - array of corresponding film controllers
   */
  _renderFilms(films) {
    return films.map((film) => {
      const filmController = new FilmController(this._filmsComponent, this._onDataChange, this._onViewChange);
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
   * @param {*} oldFilm - old film object
   * @param {*} newFilm - new (changed) film object
   */
  _onDataChange(filmController, oldFilm, newFilm) {
    if (oldFilm && newFilm) { // update film
      this._filmsModel.updateFilm(oldFilm.id, newFilm);
      filmController.render(newFilm);
      return; // TODO: !
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

    this._showingFilmControllers = this._renderFilms(this._filmsModel.getFilms().slice(0, this._showingFilmsCount));
    this._renderShowMore();
  }
}
