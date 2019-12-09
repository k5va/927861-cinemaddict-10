import {createElement} from "../../utils";

export default class AbstractComponent {
  /**
   * Component's costructor
   * @param {String} template - HTML template string
   */
  constructor(template) {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
    this._template = template;
  }

  /**
   * Returns component's template
   * @return {String} - template string
   */
  getTemplate() {
    return this._template;
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
