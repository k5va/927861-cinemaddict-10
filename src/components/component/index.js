import {createElement} from "../../utils";
import {HIDDEN_CLASS, SHAKE_ANIMATION_TIMEOUT} from "../../consts";

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

  /**
   * Clears reference to component's element
   */
  resetElement() {
    this._element = null;
  }

  /**
   * Shows component
   */
  show() {
    if (this._element) {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

  /**
   * Hides component
   */
  hide() {
    if (this._element) {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }

  /**
 * Shakes component
 * @return {Promise} - promise that resolves when shaking stops
 */
  shake() {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.getElement().style.animation = ``;
        resolve();
      }, SHAKE_ANIMATION_TIMEOUT);
    });
  }
}
