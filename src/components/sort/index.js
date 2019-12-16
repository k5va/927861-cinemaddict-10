import AbstractComponent from "../component";
import {template} from "./template";
import {SortType} from "../../consts";

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
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

      // check if target is a sort link
      if (!evt.target.classList.contains(`sort__button`)) {
        return;
      }

      const sortType = evt.target.dataset.sortType;
      if (this._currentSortType === sortType) {
        // return if sort type hasn't changed
        return;
      }

      // toggle sort buttons
      this._toggleSortLinks(evt.target);

      // save current sort and call handler
      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }

  /**
   * Returns active sort link
   * @return {HTMLElement} - current active sort link
   */
  _getActiveSortLink() {
    return this.getElement().querySelector(`.sort__button--active`);
  }

  /**
   * Changes active sort link to selected
   * @param {HTMLElement} selectedSortLink - selected sort link
   */
  _toggleSortLinks(selectedSortLink) {
    // toggle sort buttons
    this._getActiveSortLink().classList.toggle(`sort__button--active`);
    selectedSortLink.classList.toggle(`sort__button--active`);
  }
}
