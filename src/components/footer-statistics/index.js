import Component from "../component";
import {template} from "./template";

export default class FooterStatistics extends Component {
  constructor(films) {
    super(template(films));
  }
}
