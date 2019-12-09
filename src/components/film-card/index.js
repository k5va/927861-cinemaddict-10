import AbstractComponent from "../component";
import {template} from "./template";

export default class Film extends AbstractComponent {
  constructor(film) {
    super(template(film));
  }

  /**
   * Sets show film details handler function.
   * @param {Function} handler - handler
   */
  setShowDetailsHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }
}
