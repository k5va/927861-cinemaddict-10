import AbstractComponent from "../component";
import {template} from "./template";

export default class TopRatedFilms extends AbstractComponent {
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
}
