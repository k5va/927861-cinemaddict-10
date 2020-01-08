import AbstractComponent from "../component";
import {template} from "./template";
import {HIDDEN_CLASS} from "../../consts";

const DEFAULT_TITLE = `All movies. Upcoming`;

export default class Films extends AbstractComponent {

  /**
  * Returns component's template
  * @return {String} - template
  */
  getTemplate() {
    return template();
  }

  /**
   * Returns component's list container element
   * @return {HTMLElement} - list container
   */
  getListContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }

  /**
   * Removes all film list elements
   */
  resetList() {
    this.getListContainer().innerHTML = ``;
  }

  setTitle(title) {
    const titleElement = this.getElement().querySelector(`.films-list__title`);
    titleElement.innerText = title;
    titleElement.classList.remove(HIDDEN_CLASS);
  }

  resetTitle() {
    const titleElement = this.getElement().querySelector(`.films-list__title`);
    titleElement.innerText = DEFAULT_TITLE;
    titleElement.classList.add(HIDDEN_CLASS);

  }
}
