import AbstractComponent from "../component";
import {template} from "./template";

export default class FooterStatistics extends AbstractComponent {
  constructor(films) {
    super(template(films));
  }
}
