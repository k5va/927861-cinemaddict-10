import {UserProfileComponent, MenuComponent, FooterStaticticsComponent} from "./components";
import {generateFilms} from "./mock/film";
import {render} from "./utils";
import {PageController} from "./controllers";

const FILMS_COUNT = 14;

const films = generateFilms(FILMS_COUNT);

// render user profile
const headerElement = document.querySelector(`.header`);
render(headerElement, new UserProfileComponent(films));

// render menu
const mainElement = document.querySelector(`.main`);
render(mainElement, new MenuComponent(films));

// render films
const pageController = new PageController(mainElement);
pageController.render(films);

// render footer statistics
const footerElement = document.querySelector(`.footer`);
render(footerElement, new FooterStaticticsComponent(films.length));
