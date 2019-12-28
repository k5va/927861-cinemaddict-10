import AbstractSmartComponent from "../smart-component";
import {template} from "./template";
import {renderGenresChart} from "./render-genres-chart";
import {StatisticsFilter} from "../../consts";

export default class Statistics extends AbstractSmartComponent {

  constructor(films) {
    super();

    this._films = films;
    this._statisticsPeriod = StatisticsFilter.ALL;

    this._genresChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return template(this._films, this._statisticsPeriod);
  }

  show() {
    super.show();
    this.rerender();
  }

  rerender() {
    super.rerender();
    this.getElement().querySelector(`#statistic-${this._statisticsPeriod}`).checked = true;
    this._renderCharts();
  }

  recoverListeners() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, (evt) => {
      if (!evt.target.classList.contains(`statistic__filters-input`)) {
        return;
      }

      this._statisticsPeriod = evt.target.value;
      this.rerender();
    });
  }

  _renderCharts() {
    const genresCtx = this.getElement().querySelector(`.statistic__chart`);
    this._resetCharts();
    this._genresChart = renderGenresChart(genresCtx, this._films, this._statisticsPeriod);
  }

  _resetCharts() {
    if (this._genresChart) {
      this._genresChart.destroy();
      this._genresChart = null;
    }
  }
}
