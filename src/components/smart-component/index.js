import AbstractComponent from "../component";

export default class AbstractSmartComponent extends AbstractComponent {
  /**
   * Recovers all component's listeners
   */
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  /**
   * Re-renders component
   */
  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.resetElement();
    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}
