import {MenuComponent} from "../../components";
import {render, replace} from "../../utils";
import {generateMenu} from "./generate-menu";
import {MenuItem} from "../../consts";
import PageController from "../page";

export default class MenuController {
  /**
   * Creates menu controller instance
   * @param {HTMLElement} container - parent container element
   * @param {FilmsModel} filmsModel - films model
   */
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._menuComponent = null;
    this._selectedMenuItem = MenuItem.ALL;
    this._pageController = new PageController(this._container, this._filmsModel);

    this._selectMenuItemHandler = this._selectMenuItemHandler.bind(this);
    this._filmsDataChangeHadler = this._filmsDataChangeHadler.bind(this);

    this._filmsModel.setDataChangeHandler(this._filmsDataChangeHadler);
  }

  /**
   * Renders menu
   */
  render() {
    const oldMenuComponent = this._menuComponent;
    this._menuComponent = new MenuComponent(generateMenu(this._filmsModel.getFilmsAll(), this._selectedMenuItem));
    this._menuComponent.setSelectMenuItemHandler(this._selectMenuItemHandler);

    if (oldMenuComponent) {
      replace(this._menuComponent, oldMenuComponent);
    } else {
      render(this._container, this._menuComponent);
    }

    // render films
    this._pageController.render();
  }

  /**
   * Select menu item handler
   * @param {String} menuItem - selected menu item
   */
  _selectMenuItemHandler(menuItem) {
    if (menuItem !== MenuItem.STAT) {
      this._filmsModel.setFilter(menuItem);
    }
  }

  /**
   * Films model data change handler
   */
  _filmsDataChangeHadler() {
    this.render();
  }
}
