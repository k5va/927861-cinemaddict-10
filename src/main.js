import {createUserProfileTemplate} from "./components/user-profile";
import {createMenuTemplate} from "./components/menu";
import {createSortTemplate} from "./components/sort";
import {createFilmsTemplate} from "./components/films";
import {createShowMoreTemplate} from "./components/show-more";
import {createFilmDetailsTemplate} from "./components/film-details";
import {generateFilms} from "./mock/film";

const FILMS_COUNT = 5;

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

const films = generateFilms(FILMS_COUNT);
const headerElement = document.querySelector(`.header`);
// render user profile
render(headerElement, createUserProfileTemplate());

const mainElement = document.querySelector(`.main`);
// render menu
render(mainElement, createMenuTemplate());
// render sort
render(mainElement, createSortTemplate());
// render films
render(mainElement, createFilmsTemplate(films));

const filmsElement = mainElement.querySelector(`.films`);
const allFilmsElement = filmsElement.querySelector(`.films-list > .films-list__container`);
// render show more
render(allFilmsElement, createShowMoreTemplate(), `afterend`);

// render film details popup
render(mainElement, createFilmDetailsTemplate(films[0]), `afterend`);
