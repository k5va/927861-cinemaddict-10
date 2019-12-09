import {FilmsComponent, NoFilmsComponent, ShowMoreComponent, SortComponent} from "../../components";
import {renderFilm} from "./render-film";
import {FILMS_PER_LOAD} from "../../const";
import {render} from "../../utils";
import {renderTopRatedFilms} from "./render-top-rated";
import {renderMostCommentedFilms} from "./render-most-commented";

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

    let renderedFilmsCount = FILMS_PER_LOAD;
    // render films list
    render(this._container, this._filmsComponent);

    // render initial number of film cards
    films.slice(0, FILMS_PER_LOAD).forEach((film) => renderFilm(film, this._filmsComponent));

    // render show more
    render(this._filmsComponent.getElement(), this._showMoreComponent);
    this._showMoreComponent.setShowMoreHandler(() => {
      // render new portion of films
      films
        .slice(renderedFilmsCount, renderedFilmsCount + FILMS_PER_LOAD)
        .forEach((film) => renderFilm(film, this._filmsComponent));
      // update rendered tasks counter and check if there are more tasks to load
      renderedFilmsCount += FILMS_PER_LOAD;
      if (renderedFilmsCount >= films.length) {
        // no more tasks to load
        this._showMoreComponent.removeElement();
      }
    });

    // render top rated films
    renderTopRatedFilms(this._filmsComponent.getElement(), films);
    // render most commented films
    renderMostCommentedFilms(this._filmsComponent.getElement(), films);
  }
}
