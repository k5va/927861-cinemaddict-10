import {findMostCommentedFilms} from "./find-most-commented";
import {MostCommentedFilmsComponent, FilmComponent} from "../../components";
import {render} from "../../utils";

/**
 * Filters most commented films, creates Most commeted films component and renders it
 * @param {HTMLElement} container - parent HTML element
 * @param {Array<*>} films - array of films
 */
const renderMostCommentedFilms = (container, films) => {
  const mostCommentedFilms = findMostCommentedFilms(films);
  const mostCommentedFilmsComponent = new MostCommentedFilmsComponent();

  render(container, mostCommentedFilmsComponent);
  mostCommentedFilms.forEach((film) => render(
      mostCommentedFilmsComponent.getListContainer(),
      new FilmComponent(film))
  );
};

export {renderMostCommentedFilms};
