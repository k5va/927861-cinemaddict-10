import AbstractComponent from "../component";
import {template} from "./template";

export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super(template(film));
  }

  /**
   * Sets film details close handler
   * @param {Function} handler - close handler
   */
  setCloseHandler(handler) {
    this
      .getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }
}
