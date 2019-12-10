import AbstractComponent from "../component";
import {template} from "./template";

export default class FooterStatistics extends AbstractComponent {
  constructor(filmsCount) {
    super();

    this._filmsCount = filmsCount;
  }

  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template(this._filmsCount);
  }

}
