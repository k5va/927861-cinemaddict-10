import AbstractComponent from "../component";
import {template} from "./template";

export default class NoFilms extends AbstractComponent {

  constructor(message) {
    super();

    this._message = message;
  }

  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template(this._message);
  }
}
