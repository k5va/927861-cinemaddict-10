import {createElement} from "../../utils";

export default class AbstractComponent {
  /**
   * Component's constructor
   */
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  /**
   * Returns component's template
   */
  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  /**
   * Returns component's HTMLElement
   * @return {HTMLElement} - HTMLElement that correspondes to component
   */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  /**
   * Removes component from the DOM
   */
  removeElement() {
    this.getElement().remove();
    this._element = null;
  }
}
