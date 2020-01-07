import {UserProfileComponent, FooterStaticticsComponent} from "./components";
import {render, replace} from "./utils";
import {MenuController} from "./controllers";
import {FilmsModel} from "./models";
import {END_POINT, AUTHORIZATION} from "./consts";
import API from "./api";

const filmsModel = new FilmsModel();
const api = new API(END_POINT, AUTHORIZATION);

// render user profile
const headerElement = document.querySelector(`.header`);
let userProfileComponent = new UserProfileComponent(filmsModel.getFilmsAll());
render(headerElement, userProfileComponent);

// render menu
const mainElement = document.querySelector(`.main`);
const menuController = new MenuController(mainElement, filmsModel, api);
menuController.render();

// render footer statistics
const footerElement = document.querySelector(`.footer`);
let footerStatisticsComponent = new FooterStaticticsComponent(filmsModel.getFilmsAll().length);
render(footerElement, footerStatisticsComponent);

filmsModel.setDataChangeHandler(() => {
  const oldUserProfileComponent = userProfileComponent;
  userProfileComponent = new UserProfileComponent(filmsModel.getFilmsAll());
  replace(userProfileComponent, oldUserProfileComponent);

  const oldFooterStatisticsComponent = footerStatisticsComponent;
  footerStatisticsComponent = new FooterStaticticsComponent(filmsModel.getFilmsAll().length);
  replace(footerStatisticsComponent, oldFooterStatisticsComponent);
});

api
  .getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
  });
