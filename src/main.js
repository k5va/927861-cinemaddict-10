import {UserProfileComponent, FooterStaticticsComponent} from "./components";
import {render} from "./utils";
import {MenuController} from "./controllers";
import {FilmsModel} from "./models";
import {END_POINT, AUTHORIZATION} from "./consts";
import API from "./api";

const filmsModel = new FilmsModel();
const api = new API(END_POINT, AUTHORIZATION);

// render user profile
const headerElement = document.querySelector(`.header`);
render(headerElement, new UserProfileComponent(filmsModel.getFilmsAll()));

// render menu
const mainElement = document.querySelector(`.main`);
const menuController = new MenuController(mainElement, filmsModel, api);

// render footer statistics
const footerElement = document.querySelector(`.footer`);
render(footerElement, new FooterStaticticsComponent(filmsModel.getFilmsAll().length));

api
  .getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    menuController.render();
  });
