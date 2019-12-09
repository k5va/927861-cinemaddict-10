import {findTopRatedFilms} from "./find-top-rated";
import {TopRatedFilmsComponent, FilmComponent} from "../../components";
import {render} from "../../utils";

/**
 * Filters top rated films, creates TopRatedFilms component and renders it
 * @param {HTMLElement} container - parent HTML element
 * @param {Array<*>} films - array of films
 */
const renderTopRatedFilms = (container, films) => {
  const topRatedFilms = findTopRatedFilms(films);
  const topRatedFilmsComponent = new TopRatedFilmsComponent();

  render(container, topRatedFilmsComponent);
  topRatedFilms.forEach((film) => render(
      topRatedFilmsComponent.getListContainer(),
      new FilmComponent(film))
  );
};

export {renderTopRatedFilms};
