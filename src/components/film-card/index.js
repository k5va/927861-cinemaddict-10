import AbstractComponent from "../component";
import {template} from "./template";

export default class Film extends AbstractComponent {
  constructor(film) {
    super(template(film));
  }

  getPosterElement() {
    return this.getElement().querySelector(`.film-card__poster`);
  }

  getTitleElement() {
    return this.getElement().querySelector(`.film-card__title`);
  }

  getCommentsCountElement() {
    return this.getElement().querySelector(`.film-card__comments`);
  }
}
