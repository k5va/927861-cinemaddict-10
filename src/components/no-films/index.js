import AbstractComponent from "../component";
import {template} from "./template";

export default class NoFilms extends AbstractComponent {
  constructor() {
    super(template());
  }
}
