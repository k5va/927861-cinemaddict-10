import {FilmsComponent, NoFilmsComponent, ShowMoreComponent, SortComponent} from "../../components";
import {render} from "../../utils";
import {renderTopRatedFilms} from "./render-top-rated";
import {renderMostCommentedFilms} from "./render-most-commented";
import {renderFilms} from "./render-films";
import {SortType} from "../../const";

export default class FilmsController {
  /**
   * Creates an instance of FilmsController.
   * @param {HTMLElement} container - parent HTML Element to render data to
   */
  constructor(container) {
    this._container = container;
    this._filmsComponent = new FilmsComponent();
    this._showMoreComponent = new ShowMoreComponent();
    this._sortComponent = new SortComponent();
  }

  /**
   * Renders given films
   * @param {Array<*>} films - array of film objects
   */
  render(films) {
    if (!films.length) {
      // render No-films
      render(this._container, new NoFilmsComponent());
      return;
    }
    // render sort
    render(this._container, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedFilms = [];

      switch (sortType) {
        case SortType.DATE:
          sortedFilms = films.slice().sort((film1, film2) => film1.releaseDate - film2.releaseDate);
          break;
        case SortType.RATING:
          sortedFilms = films.slice().sort((film1, film2) => film2.rating - film1.rating);
          break;
        case SortType.DEFAULT:
          sortedFilms = films;
          break;
      }
      renderFilms(sortedFilms, this._filmsComponent, this._showMoreComponent);
    });

    // render films list
    render(this._container, this._filmsComponent);
    renderFilms(films, this._filmsComponent, this._showMoreComponent);

    // render top rated films
    renderTopRatedFilms(this._filmsComponent.getElement(), films);
    // render most commented films
    renderMostCommentedFilms(this._filmsComponent.getElement(), films);
  }
}
