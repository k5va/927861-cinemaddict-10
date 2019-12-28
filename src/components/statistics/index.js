import AbstractSmartComponent from "../smart-component";
import {template} from "./template";
import {renderGenresChart} from "./render-genres-chart";

export default class Statistics extends AbstractSmartComponent {

  constructor(films) {
    super();

    this._films = films;

    this._genresChart = null;

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
    const element = this.getElement();

    const genresCtx = element.querySelector(`.statistic__chart`);

    this._resetCharts();
    this._daysChart = renderGenresChart(genresCtx, this._films);
  }

  _resetCharts() {
    if (this._genresChart) {
      this._genresChart.destroy();
      this._genresChart = null;
    }
  }
}
