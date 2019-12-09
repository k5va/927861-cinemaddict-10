import {
  UserProfileComponent, MenuComponent, SortComponent,
  FooterStaticticsComponent
} from "./components";
import {generateFilms} from "./mock/film";
import {render} from "./utils";
import {FilmsController} from "./controllers";

const FILMS_COUNT = 22;

const films = generateFilms(FILMS_COUNT);

// render user profile
const headerElement = document.querySelector(`.header`);
render(headerElement, new UserProfileComponent(films));

// render menu
const mainElement = document.querySelector(`.main`);
render(mainElement, new MenuComponent(films));

// render sort
render(mainElement, new SortComponent());

// render films
const filmsController = new FilmsController(mainElement);
filmsController.render(films);

// render footer statistics
const footerElement = document.querySelector(`.footer`);
render(footerElement, new FooterStaticticsComponent(films));
