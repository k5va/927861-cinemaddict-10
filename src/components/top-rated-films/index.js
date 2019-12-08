import Component from "../component";
import {template} from "./template";

export default class TopRatedFilms extends Component {
  constructor() {
    super(template());
  }

  getListContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
