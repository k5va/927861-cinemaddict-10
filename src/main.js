import {createUserProfileTemplate} from "./components/user-profile";
import {createMenuTemplate} from "./components/menu";
import {createSortTemplate} from "./components/sort";
import {createFilmsTemplate} from "./components/films";
import {createShowMoreTemplate} from "./components/show-more";
import {createFilmDetailsTemplate} from "./components/film-details";
import {createFilmCardTemplate} from "./components/film-card";
import {createFooterStatisticsTemplate} from "./components/footer-statistics";
import {generateFilms} from "./mock/film";
import {FILMS_PER_LOAD} from "./const";

const FILMS_COUNT = 14;

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
render(headerElement, createUserProfileTemplate(films));

const mainElement = document.querySelector(`.main`);
// render menu
render(mainElement, createMenuTemplate(films));
// render sort
render(mainElement, createSortTemplate());
// render films list
render(mainElement, createFilmsTemplate(films));

const mainFilmsElement = mainElement.querySelector(`.films-list > .films-list__container`);
// render initial number of film cards
films
  .slice(0, FILMS_PER_LOAD)
  .forEach((film) => render(mainFilmsElement, createFilmCardTemplate(film)));
// render show more
render(mainFilmsElement, createShowMoreTemplate(), `afterend`);

let renderedFilmsCount = FILMS_PER_LOAD;
const showMoreButton = document.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  // render new portion of films
  films
    .slice(renderedFilmsCount, renderedFilmsCount + FILMS_PER_LOAD)
    .forEach((film) => render(mainFilmsElement, createFilmCardTemplate(film)));
  // update rendered tasks counter and check if there are more tasks to load
  renderedFilmsCount += FILMS_PER_LOAD;
  if (renderedFilmsCount >= FILMS_COUNT) {
    // no more tasks to load
    showMoreButton.remove();
  }
});

// render film details popup
render(mainElement, createFilmDetailsTemplate(films[0]), `afterend`);

const footerElement = document.querySelector(`.footer`);
// render footer statistics
render(footerElement, createFooterStatisticsTemplate(films));
