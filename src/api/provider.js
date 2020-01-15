import nanoid from "nanoid";
import {Film, Comment} from "../models";

const DEFAULT_COMMENT_AUTHOR = `John Doe`;

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isSynchronized = true;
  }

  /**
  * Get films list
  * @return {Promise<Array<Film>>} - promise that resolves with array of films
  */
  getFilms() {
    if (this._isOnLine()) {
      return this._api.getFilms().then((films) => {
        films.forEach((film) => this._store.setItem(film.id, film.toRAW()));
        return films;
      });
    }

    // if offline
    const storeFilms = Object.values(this._store.getAll());
    this._isSynchronized = false;

    return Promise.resolve(
        storeFilms.map((film) => Film.parseFilmWithComments({movie: film, comments: film.comments}))
    );
  }

  /**
  * Updates film
  * @param {Film} film - film
  * @return {Promise<Film>} - promise that resolves to updated film
  */
  updateFilm(film) {
    if (this._isOnLine()) {
      return this._api.updateFilm(film)
        .then((updatedFilm) => {
          this._store.setItem(updatedFilm.id, updatedFilm.toRAW());
          return updatedFilm;
        });
    }
    // if offline
    this._isSynchronized = false;
    const updatedFilm = Film.clone(film);
    this._store.setItem(film.id, Object.assign({}, updatedFilm.toRAW(), {offline: true}));

    return Promise.resolve(updatedFilm);
  }

  /**
   * Creates new comment
   * @param {String} filmId - film id
   * @param {Comment} comment - comment
   * @return {Promise<Film>} - promise that resolves to updated film
   */
  createComment(filmId, comment) {
    if (this._isOnLine()) {
      return this._api.createComment(filmId, comment)
        .then((updatedFilm) => {
          this._store.setItem(updatedFilm.id, updatedFilm.toRAW());
          return updatedFilm;
        });
    }

    // if offline
    this._isSynchronized = false;
    const updatedFilm = this._store.getItem(filmId);

    const newComment = Object.assign(
        {}, comment.toRAW(), {id: nanoid(), filmId, author: DEFAULT_COMMENT_AUTHOR}, {offline: true}
    );

    updatedFilm.comments.push(newComment);
    this._store.setItem(filmId, Object.assign({}, updatedFilm, {offline: true}));

    return Promise.resolve(Film.parseFilmWithComments({movie: updatedFilm, comments: updatedFilm.comments}));
  }

  /**
   * Deletes comment on server
   * @param {String} id - comment id
   * @return {Promise<String>} - promise that resoves to deleted comment id
   */
  deleteComment(id) {
    if (this._isOnLine()) {
      return this._api.deleteComment(id)
        .then(() => {
          // delete comment from storage
          const updatedFilm = this._findFilmByCommentId(id);
          const comments = updatedFilm.comments;
          const index = comments.findIndex((comment) => comment.id === id);
          updatedFilm.comments = [...comments.slice(0, index), ...comments.slice(index + 1)];
          this._store.setItem(updatedFilm.id, updatedFilm);

          return id;
        });
    }

    // if offline
    this._isSynchronized = false;
    const updatedFilm = this._findFilmByCommentId(id);
    const comments = updatedFilm.comments;
    const index = comments.findIndex((comment) => comment.id === id);
    updatedFilm.deletedComments = updatedFilm.deletedComments || [];
    if (!comments[index].offline) {
      updatedFilm.deletedComments.push(comments[index]);
    }
    updatedFilm.comments = [...comments.slice(0, index), ...comments.slice(index + 1)];
    this._store.setItem(updatedFilm.id, Object.assign({}, updatedFilm, {offline: true}));

    return Promise.resolve(id);
  }

  _findFilmByCommentId(commentId) {
    return Object
      .values(this._store.getAll())
      .find(({comments}) => comments.some((comment) => comment.id === commentId));
  }

  /**
   * Sync local data with server
   * @return {Promise} - returns promise resolved if sync is done without errors
   */
  sync() {
    if (this._isOnLine()) {
      const storeFilms = Object.values(this._store.getAll());

      return this._syncComments(storeFilms)
        .then(() => this._syncFilms(storeFilms))
        .then(() => {
          this._isSynchronized = true;
          return this.getFilms();
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  _syncComments(storeFilms) {
    return this._createOfflineComments(storeFilms).then(() => this._deleteOfflineComments(storeFilms));
  }

  _createOfflineComments(storeFilms) {
    return Promise.all(storeFilms
      .reduce((acc, film) => [...acc, ...film.comments], []) // get all comments
      .filter((comment) => comment.offline) // filter comments created offline
      .map((newComment) => this._api.createComment(newComment.filmId, Comment.parseComment(newComment))));
  }

  _deleteOfflineComments(storeFilms) {
    return Promise.all(storeFilms
      .filter((film) => film.deletedComments)
      .reduce((acc, film) => [...acc, ...film.deletedComments], [])
      .map((deletedComment) => this._api.deleteComment(deletedComment.id)));
  }

  _syncFilms(storeFilms) {
    return this._api.sync(storeFilms)
      .then(() => this._api.getFilms())
      .then((films) => films.forEach((film) => this._store.setItem(film.id, film.toRAW())));
  }

  isSynchronized() {
    return this._isSynchronized;
  }

  _isOnLine() {
    return window.navigator.onLine;
  }
}
