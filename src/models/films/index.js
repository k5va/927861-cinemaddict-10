import {Filter, SortType} from "../../consts";
import {FilterFilms} from "../../utils";
import {sortFilms} from "./sort-films";
import {findMostCommentedFilms} from "./find-most-commented";
import {findTopRatedFilms} from "./find-top-rated";

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

    if (!FilterFilms[this._filter]) {
      throw new Error(`Unsupported filter: ${this._filter}`);
    }

    return sortFilms(FilterFilms[this._filter](this._films), this._sortType);
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
   * Returns initial array of films
   * @return {Array} - array of films
   */
  getFilmsAll() {
    return this._films;
  }

  /**
   * Returns top most commented films
   * @return {Array<*>} - array of top most commented films
   */
  getMostCommentedFilms() {
    return findMostCommentedFilms(this.getFilmsAll());
  }

  /**
   * Returns top rated films
   * @return {Array<*>} - array of top rated films
   */
  getTopRatedFilms() {
    return findTopRatedFilms(this.getFilmsAll());
  }

  /**
   * Updates film in model
   *
   * @param {String} id - film id
   * @param {Object} film - film object
   * @return {Object} - updated film
   */
  updateFilm(id, film) {
    const index = this._findfilmById(id);
    // create new copy of films array with updated film. Can be used later for undo operations
    this._films = [...this._films.slice(0, index), film, ...this._films.slice(index + 1)];
    // notify data change handlers
    this._callHandlers(this._dataChangeHandlers);

    return film;
  }

  /**
   * Adds new film comment
   * @param {String} filmId - film's id to add commment to
   * @param {*} comment - comment
   * @return {Object} - updated film
   */
  addFilmComment(filmId, comment) {
    const index = this._findfilmById(filmId);
    const film = this._films[index];
    film.comments = [...film.comments, comment];
    // notify data change handlers
    this._callHandlers(this._dataChangeHandlers);

    return film;
  }

  /**
   * Deletes film comment
   * @param {String} filmId - film's id to delete commment
   * @param {String} commentId - comment's id
   * @return {Object} - updated film
   */
  deleteFilmComment(filmId, commentId) {
    const index = this._findfilmById(filmId);
    const film = this._films[index];
    const commentIndex = film.comments.findIndex((comment) => comment.id === commentId);
    if (commentIndex === -1) {
      throw new Error(`Comment with id ${commentId} id not found`);
    }

    film.comments = [...film.comments.slice(0, commentIndex), ...film.comments.slice(commentIndex + 1)];
    // notify data change handlers
    this._callHandlers(this._dataChangeHandlers);

    return film;
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
    const index = this._films.findIndex((film) => film.id === id);
    if (index === -1) {
      throw new Error(`Film with id ${id} is not found`);
    }

    return index;
  }

  /**
   * Calls all registered handlers
   * @param {Array<Function>} handlers - array of handlers
   */
  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  _generateCommentsId() {
    return String(new Date() + Math.random());
  }
}
