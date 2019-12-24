import AbstractComponent from "../component";
import {template} from "./template";

export default class MostCommentedFilms extends AbstractComponent {
  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template();
  }

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
