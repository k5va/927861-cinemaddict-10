import {Filter, SortType} from "../../consts";
import {filterFilms} from "../../utils";

import {sortFilms} from "./sort-films";

export default class Films {
  /**
   * Creates an instance of Films model.
   */
  constructor() {
    this._films = [];
    this._filter = Filter.ALL;
    this._sortType = SortType.DEFAULT;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  /**
   * Returns model's films filtered and sorted
   * @return {Array} - array of films
   */
  getFilms() {

    if (!filterFilms[this._filter]) {
      throw new Error(`Unsupported filter: ${this._filter}`);
    }

    return sortFilms(filterFilms[this._filter](this._films), this._sortType);
  }

  /**
   * Returns initial array of films
   * @return {Array} - array of films
   */
  getFilmsAll() {
    return this._films;
  }

  /**
   * Sets model's films
   *
   * @param {Iterable} films - films
   */
  setFilms(films) {
    this._films = [...films];
    // notify data change handlers
    this._callHandlers(this._dataChangeHandlers);
  }


  /**
   * Updates film in model
   *
   * @param {String} id - film id
   * @param {*} film - film object
   */
  updateFilm(id, film) {
    const index = this._findfilmById(id);
    if (index === -1) {
      throw new Error(`Film with id ${id} is not found`);
    }
    // create new copy of films array with updated film. Can be used later for undo operations
    this._films = [...this._films.slice(0, index), film, ...this._films.slice(index + 1)];
    // notify data change handlers
    this._callHandlers(this._dataChangeHandlers);
  }

  /**
   * Sets filter to be applied when getfilms is called
   * @param {String} filter - filter
   */
  setFilter(filter) {
    this._filter = filter;
    // call registered filter change handlers
    this._callHandlers(this._filterChangeHandlers);
  }

  /**
   * Sets sort type to be applied when getfilms is called
   * @param {String} sortType - sort type
   */
  setSortType(sortType) {
    this._sortType = sortType;
  }

  /**
   * Register filter change handler
   * @param {Function} handler - handler
   */
  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  /**
   * Adds model's data change handler
   * @param {Function} handler - handler
   */
  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  /**
   * Returns films index by given film id
   * @param {String} id - films id
   * @return {Number} - film'is index or -1
   */
  _findfilmById(id) {
    return this._films.findIndex((film) => film.id === id);
  }

  /**
   * Calls all registered handlers
   * @param {Array<Function>} handlers - array of handlers
   */
  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
