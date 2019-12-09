import AbstractComponent from "../component";
import {template} from "./template";

export default class Films extends AbstractComponent {
  constructor() {
    super(template());
  }

  getListContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
