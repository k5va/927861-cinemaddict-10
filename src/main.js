import {
  UserProfileComponent, MenuComponent, SortComponent,
  FilmsComponent, TopRatedFilmsComponent, MostCommentedFilmsComponent,
  ShowMoreComponent, FooterStaticticsComponent, FilmComponent, FilmDetailsComponent
} from "./components";
import {generateFilms} from "./mock/film";
import {render, RenderPosition} from "./utils/utils";
import {FILMS_PER_LOAD, TOP_RATED_FILMS_COUNT, MOST_COMMENTED_FILMS_COUNT} from "./const";

const FILMS_COUNT = 14;

/**
* Filters through films array to find top rated
* @param {Array<*>} films - array of films
* @return {Array<*>} - array of top rated films
*/
const findTopRatedFilms = (films) => films
  .filter((film) => film.rating > 0)
  .sort((film1, film2) => film2.rating - film1.rating)
  .slice(0, TOP_RATED_FILMS_COUNT);

/**
 * Filters through films array to find most commented
 * @param {Array<*>} films - array of films
 * @return {Array<*>} - array of most commented films
 */
const findMostCommentedFilms = (films) => films
  .filter((film) => film.comments.length > 0)
  .sort((film1, film2) => film2.comments.length - film1.comments.length)
  .slice(0, MOST_COMMENTED_FILMS_COUNT);

/**
* Creates film component and renders it to the DOM with open details mode support
* @param {*} film - film object
*/
const renderFilm = (film) => {
  const filmComponent = new FilmComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  /**
   * Renders film details component
   */
  const showFilmDetails = () => {
    render(mainFilmsComponent.getElement(), filmDetailsComponent);
    filmDetailsComponent.getCloseElement().addEventListener(`click`, () => {
      // remove film details component from the DOM
      filmDetailsComponent.removeElement();
    });
  };

  // register show film details handler
  filmComponent.getPosterElement().addEventListener(`click`, showFilmDetails);
  filmComponent.getTitleElement().addEventListener(`click`, showFilmDetails);
  filmComponent.getCommentsCountElement().addEventListener(`click`, showFilmDetails);

  // render film component
  render(mainFilmsComponent.getListContainer(), filmComponent);
};

/**
 * Renders next film cards
 */
const showMoreHandler = () => {
  // render new portion of films
  films
    .slice(renderedFilmsCount, renderedFilmsCount + FILMS_PER_LOAD)
    .forEach((film) => renderFilm(film));
  // update rendered tasks counter and check if there are more tasks to load
  renderedFilmsCount += FILMS_PER_LOAD;
  if (renderedFilmsCount >= FILMS_COUNT) {
    // no more tasks to load
    showMoreComponent.removeElement();
  }
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const filmListElement = mainElement.querySelector(`.films`);
const footerElement = document.querySelector(`.footer`);

let renderedFilmsCount = FILMS_PER_LOAD;
const films = generateFilms(FILMS_COUNT);

// render user profile
render(headerElement, new UserProfileComponent(films));

// render sort
render(mainElement, new SortComponent(), RenderPosition.AFTER_BEGIN);

// render menu
render(mainElement, new MenuComponent(films), RenderPosition.AFTER_BEGIN);

// render films list
const mainFilmsComponent = new FilmsComponent();
render(filmListElement, mainFilmsComponent);

// render initial number of film cards
films.slice(0, FILMS_PER_LOAD).forEach((film) => renderFilm(film));

// render show more
const showMoreComponent = new ShowMoreComponent();
render(mainFilmsComponent.getElement(), showMoreComponent);
showMoreComponent.getElement().addEventListener(`click`, showMoreHandler);

// render top rated films
const topRatedFilms = findTopRatedFilms(films);
const topRatedFilmsComponent = new TopRatedFilmsComponent();
render(filmListElement, topRatedFilmsComponent);
topRatedFilms.forEach((film) => render(
    topRatedFilmsComponent.getListContainer(),
    new FilmComponent(film))
);

// render most commented films
const mostCommentedFilms = findMostCommentedFilms(films);
const mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
render(filmListElement, mostCommentedFilmsComponent);
mostCommentedFilms.forEach((film) => render(
    mostCommentedFilmsComponent.getListContainer(),
    new FilmComponent(film))
);

// render footer statistics
render(footerElement, new FooterStaticticsComponent(films));
