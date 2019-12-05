import Component from "../component";
import {template} from "./template";

export default class FilmDetails extends Component {
  constructor(film) {
    super(template(film));
  }

  /**
   * Returns components close element
   * @return {HTMLElement} - close element
   */
  getCloseElement() {
    return this.getElement().querySelector(`.film-details__close-btn`);
  }
}
