import {UserProfileComponent, FooterStaticticsComponent} from "./components";
import {render, replace} from "./utils";
import {MenuController} from "./controllers";
import {FilmsModel} from "./models";
import {END_POINT, AUTHORIZATION, STORE_NAME} from "./consts";
import {API, Store, Provider} from "./api";

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

const filmsModel = new FilmsModel();
const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

// render user profile
const headerElement = document.querySelector(`.header`);
let userProfileComponent = new UserProfileComponent(filmsModel.getFilmsAll());
render(headerElement, userProfileComponent);

// render menu
const mainElement = document.querySelector(`.main`);
const menuController = new MenuController(mainElement, filmsModel, apiWithProvider);
menuController.render(false);

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

apiWithProvider
  .getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
  });

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  if (!apiWithProvider.isSynchronized()) {
    apiWithProvider.sync();
  }
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});

