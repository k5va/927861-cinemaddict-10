import Component from "../component";
import {template} from "./template";

export default class Menu extends Component {
  constructor(films) {
    super(template(films));
  }
}
