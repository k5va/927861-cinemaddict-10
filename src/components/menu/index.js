import AbstractComponent from "../component";
import {template} from "./template";

export default class Menu extends AbstractComponent {
  constructor(menuItems) {
    super();

    this._menuItems = menuItems;
    this._currentMenuItemElement = this._findSelectedMenuItem();
  }

  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template(this._menuItems);
  }

  /**
   * Sets select menu item handler
   * @param {Function} handler - handler
   */
  setSelectMenuItemHandler(handler) {
    this
      .getElement()
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        // check if target is menu link and it is not already selected
        if (!evt.target.classList.contains(`main-navigation__item`) ||
          evt.target.classList.contains(`main-navigation__item--active`)) {
          return;
        }
        // activate selected menu item
        this._currentMenuItemElement.classList.toggle(`main-navigation__item--active`);
        evt.target.classList.toggle(`main-navigation__item--active`);
        this._currentMenuItemElement = evt.target;
        // call handler
        handler(evt.target.dataset.menuItem);
      });
  }

  /**
   * Find selected menu item element
   * @return {HTMLElement} - selected menu item DOM element
   */
  _findSelectedMenuItem() {
    return this.getElement().querySelector(`.main-navigation__item--active`);
  }
}
