import {FilmsComponent, NoFilmsComponent, ShowMoreComponent, SortComponent} from "../../components";
import {render, RenderPosition} from "../../utils";
import {renderTopRatedFilms} from "./render-top-rated";
import {renderMostCommentedFilms} from "./render-most-commented";
import {sortFilms} from "./sort-films";
import FilmController from "../film";
import {FILMS_PER_LOAD} from "../../consts";

export default class PageController {
  /**
   * Creates an instance of FilmsController.
   * @param {HTMLElement} container - parent HTML Element to render data to
   */
  constructor(container) {
    this._container = container;

    this._films = [];
    this._sortedFilms = [];
    this._showedFilmControllers = [];
    this._showingFilmsCount = FILMS_PER_LOAD;

    this._filmsComponent = new FilmsComponent();
    this._showMoreComponent = new ShowMoreComponent();
    this._sortComponent = new SortComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  /**
   * Renders given films
   * @param {Array<*>} films - array of film objects
   */
  render(films) {

    this._films = films;
    this._sortedFilms = [...films];

    if (!this._films.length) {
      // render No-films
      render(this._container, new NoFilmsComponent());
      return;
    }

    // render sort
    render(this._container, this._sortComponent);
    // render films list
    render(this._container, this._filmsComponent);
    this._showedFilmControllers = this._showedFilmControllers.concat(
        this._renderFilms(this._sortedFilms.slice(0, this._showingFilmsCount))
    );

    // render show more button
    this._renderShowMore();

    // render top rated films
    renderTopRatedFilms(this._filmsComponent.getElement(), this._films);
    // render most commented films
    renderMostCommentedFilms(this._filmsComponent.getElement(), this._films);
  }

  /**
   * Renders show more
   */
  _renderShowMore() {
    if (this._showingFilmsCount >= this._sortedFilms.length) {
      // no more films to show
      this._showMoreComponent.removeElement();
      return;
    }

    render(this._filmsComponent.getListContainer(), this._showMoreComponent, RenderPosition.AFTER_END);
    this._showMoreComponent.setShowMoreHandler(() => {
      // render new portion of films
      this._showedFilmControllers = this._showedFilmControllers.concat(
          this._renderFilms(this._sortedFilms.slice(
              this._showingFilmsCount,
              this._showingFilmsCount + FILMS_PER_LOAD)
          )
      );
      // update rendered films counter and check if there are more films to load
      this._showingFilmsCount += FILMS_PER_LOAD;
      if (this._showingFilmsCount >= this._films.length) {
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
    this._filmsComponent.resetList();
    this._showMoreComponent.removeElement();
    this._showingFilmsCount = FILMS_PER_LOAD;

    this._sortedFilms = sortFilms(this._films, sortType);
    this._showedFilmControllers = this._renderFilms(this._sortedFilms.slice(0, this._showingFilmsCount));
    this._renderShowMore();
  }

  /**
   * Film change handler
   * @param {filmController} filmController - film controller, that correspondes to film
   * @param {*} oldFilm - old film object
   * @param {*} newFilm - new (changed) film object
   */
  _onDataChange(filmController, oldFilm, newFilm) {
    const index = this._films.indexOf(oldFilm);
    if (index === -1) {
      // film object is not found
      return;
    }

    // update film and render
    this._films[index] = newFilm;
    filmController.render(this._films[index]);
  }

  /**
   * Handles film controller's switch to edit mode
   */
  _onViewChange() {
    this._showedFilmControllers.forEach((filmController) => filmController.setDefaultView());
  }

}
