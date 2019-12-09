import AbstractComponent from "../component";
import {template} from "./template";

export default class Menu extends AbstractComponent {
  constructor(films) {
    super(template(films));
  }
}
