import AbstractComponent from "../component";
import {template} from "./template";

export default class ShowMore extends AbstractComponent {
  constructor() {
    super(template());
  }

  /**
   * Sets show more button click handler.
   * @param {Function} handler - handler
   */
  setShowMoreHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
