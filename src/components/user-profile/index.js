import AbstractComponent from "../component";
import {template} from "./template";

export default class UserProfile extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template(this._films);
  }

}
