import {UserProfileComponent, FooterStaticticsComponent} from "./components";
import {generateFilms} from "./mock/film";
import {render} from "./utils";
import {PageController, MenuController} from "./controllers";
import {FilmsModel} from "./models";

const FILMS_COUNT = 14;
const filmsModel = new FilmsModel();
filmsModel.setFilms(generateFilms(FILMS_COUNT));

// render user profile
const headerElement = document.querySelector(`.header`);
render(headerElement, new UserProfileComponent(filmsModel.getFilmsAll()));

// render menu
const mainElement = document.querySelector(`.main`);
const menuController = new MenuController(mainElement, filmsModel);
menuController.render();

// render films
const pageController = new PageController(mainElement, filmsModel);
pageController.render();

// render footer statistics
const footerElement = document.querySelector(`.footer`);
render(footerElement, new FooterStaticticsComponent(filmsModel.getFilmsAll().length));
