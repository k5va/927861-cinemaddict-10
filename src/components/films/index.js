import AbstractComponent from "../component";
import {template} from "./template";

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
}
