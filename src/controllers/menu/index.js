import {MenuComponent, StatisticsComponent} from "../../components";
import {render, replace} from "../../utils";
import {generateMenu} from "./generate-menu";
import {MenuItem} from "../../consts";
import PageController from "../page";

export default class MenuController {
  /**
   * Creates menu controller instance
   * @param {HTMLElement} container - parent container element
   * @param {FilmsModel} filmsModel - films model
   * @param {API} api - api
   */
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._menuComponent = null;
    this._selectedMenuItem = MenuItem.ALL;
    this._pageController = new PageController(this._container, this._filmsModel, api);
    this._statisticsComponent = new StatisticsComponent(this._filmsModel.getFilmsAll());

    this._selectMenuItemHandler = this._selectMenuItemHandler.bind(this);
    this._filmsDataChangeHandler = this._filmsDataChangeHandler.bind(this);

    this._filmsModel.setDataChangeHandler(this._filmsDataChangeHandler);
  }

  /**
   * Renders menu
   * @param {Boolean} isDataLoaded - true if data is loaded from server
   */
  render(isDataLoaded = true) {
    const oldMenuComponent = this._menuComponent;
    this._menuComponent = new MenuComponent(generateMenu(this._filmsModel.getFilmsAll(), this._selectedMenuItem));
    this._menuComponent.setSelectMenuItemHandler(this._selectMenuItemHandler);

    if (oldMenuComponent) {
      replace(this._menuComponent, oldMenuComponent);
    } else {
      render(this._container, this._menuComponent);
      render(this._container, this._statisticsComponent);
      this._statisticsComponent.hide();
    }
    this._pageController.render(isDataLoaded);
  }

  /**
   * Select menu item handler
   * @param {String} menuItem - selected menu item
   */
  _selectMenuItemHandler(menuItem) {
    switch (menuItem) {
      default:
        this._selectedMenuItem = menuItem;
        this._filmsModel.setFilter(menuItem);
        this._pageController.show();
        this._statisticsComponent.hide();
        return;
      case MenuItem.STAT:
        this._pageController.hide();
        this._statisticsComponent.show();
        return;
    }
  }

  /**
   * Films model data change handler
   */
  _filmsDataChangeHandler() {
    this.render();
  }
}
