import AbstractSmartComponent from "../smart-component";
import {template} from "./template";

export default class Statistics extends AbstractSmartComponent {

  constructor(films) {
    super();

    this._films = films;

    this._renderCharts();
  }

  getTemplate() {
    return template(this._films);
  }

  show() {
    super.show();

    this.rerender(this._films);
  }

  rerender(films) {
    this._films = films;

    super.rerender();
    this._renderCharts();
  }

  recoverListeners() { }

  _renderCharts() {

  }

  _resetCharts() {

  }
}
