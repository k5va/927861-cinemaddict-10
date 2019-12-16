import AbstractComponent from "../component";
import {replaceElements} from "../../utils";

export default class AbstractSmartComponent extends AbstractComponent {
  /**
   * Recovers all component's listeners
   */
  recoverListeners() {
    throw new Error(`Abstract method not implemented: recoverListeners`);
  }

  /**
   * Re-renders component
   */
  rerender() {
    const oldElement = this.getElement();
    // create new HTML element
    this.resetElement();
    const newElement = this.getElement();
    // replace elements in the DOM
    replaceElements(newElement, oldElement);
    // recover element's listeners
    this.recoverListeners();
  }
}
