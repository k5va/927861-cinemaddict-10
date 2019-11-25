import {createUserProfileTemplate} from "./components/user-profile";
import {createMenuTemplate} from "./components/menu";
import {createSortTemplate} from "./components/sort";
import {createFilmsTemplate} from "./components/films";
import {createFilmCardTemplate} from "./components/film-card";
import {createShowMoreTemplate} from "./components/show-more";
import {createFilmDetailsTemplate} from "./components/film-details";

const FILMS_COUNT = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;

/**
 * Renders given HTML template to the DOM by adding it to the parent container
 * at the specified position
 * @param {HTMLElement} container - parent HTML element
 * @param {String} template - template to be added to the container
 * @param {String} place - insert position. Default value = "beforeend"
 */
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
// render user profile
render(headerElement, createUserProfileTemplate());

const mainElement = document.querySelector(`.main`);
// render menu
render(mainElement, createMenuTemplate());
// render sort
render(mainElement, createSortTemplate());
// render films list
render(mainElement, createFilmsTemplate());

const filmsElement = mainElement.querySelector(`.films`);

const allFilmsElement = filmsElement.querySelector(`.films-list > .films-list__container`);
// render all films
new Array(FILMS_COUNT)
  .fill(``)
  .forEach(() => render(allFilmsElement, createFilmCardTemplate()));

// render show more
render(allFilmsElement, createShowMoreTemplate(), `afterend`);

const topRatedFilmsElement = filmsElement.querySelector(`.films-list--top-rated > .films-list__container`);
// render top rated films
new Array(TOP_RATED_FILMS_COUNT)
  .fill(``)
  .forEach(() => render(topRatedFilmsElement, createFilmCardTemplate()));

const mostCommentedFilmsElement = filmsElement.querySelector(`.films-list--most-commented > .films-list__container`);
// reder most commented films
new Array(MOST_COMMENTED_FILMS_COUNT)
  .fill(``)
  .forEach(() => render(mostCommentedFilmsElement, createFilmCardTemplate()));

// render film details popup
render(mainElement, createFilmDetailsTemplate(), `afterend`);
