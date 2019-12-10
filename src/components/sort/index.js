import AbstractComponent from "../component";
import {template} from "./template";
import {SortType} from "../../consts";

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template();
  }

  /**
   * Sets sort type change handler
   * @param {Function} handler - handler
   */
  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;
      if (this._currenSortType === sortType) {
        // return if sort type hasn't changed
        return;
      }

      this._currenSortType = sortType;
      handler(this._currenSortType);
    });
  }
}
