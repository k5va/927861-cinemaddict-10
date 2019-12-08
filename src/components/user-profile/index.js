import AbstractComponent from "../component";
import {template} from "./template";

export default class UserProfile extends AbstractComponent {
  constructor(films) {
    super(template(films));
  }
}
