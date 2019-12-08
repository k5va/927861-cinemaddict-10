import Component from "../component";
import {template} from "./template";

export default class UserProfile extends Component {
  constructor(films) {
    super(template(films));
  }
}
