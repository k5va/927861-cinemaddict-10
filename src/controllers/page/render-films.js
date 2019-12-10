import {FILMS_PER_LOAD} from "../../consts";
import {renderFilm} from "./render-film";
import {render, RenderPosition} from "../../utils";

/**
 * Renders main film list
 * @param {Array<*>} films - array of films
 * @param {FilmsComponent} filmsComponent - Films component
 * @param {ShowMoreComponent} showMoreComponent - show more component
 */
const renderFilms = (films, filmsComponent, showMoreComponent) => {
  let renderedFilmsCount = FILMS_PER_LOAD;

  // reset films list
  filmsComponent.resetList();
  // render initial number of film cards
  films.slice(0, FILMS_PER_LOAD).forEach((film) => renderFilm(film, filmsComponent));

  // render show more
  showMoreComponent.removeElement();
  render(filmsComponent.getListContainer(), showMoreComponent, RenderPosition.AFTER_END);
  showMoreComponent.setShowMoreHandler(() => {
    // render new portion of films
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_PER_LOAD)
      .forEach((film) => renderFilm(film, filmsComponent));
    // update rendered tasks counter and check if there are more tasks to load
    renderedFilmsCount += FILMS_PER_LOAD;
    if (renderedFilmsCount >= films.length) {
      // no more tasks to load
      showMoreComponent.removeElement();
    }
  });
};

export {renderFilms};

