import {Film} from "../models";

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
      return this._api.updateFilm(film).then(
          (updatedFilm) => {
            this._store.setItem(updatedFilm.id, updatedFilm.toRAW());
            return updatedFilm;
          }
      );
    }

    // if offline
    this._isSynchronized = false;
    const updatedFilm = Film.clone(film);
    this._store.setItem(film.id, Object.assign({}, updatedFilm.toRAW(), {offline: true}));

    return Promise.resolve(updatedFilm);
  }

  /**
   * Sync local data with server
   * @return {Promise} - returns promise resolved if sync is done without errors
   */
  sync() {
    if (this._isOnLine()) {
      const storeFilms = Object.values(this._store.getAll());

      return this._api.sync(storeFilms)
        .then((response) => {
          storeFilms.filter((film) => film.offline).forEach((film) => {
            this._store.removeItem(film.id);
          });

          const updatedFilms = response.updated;

          updatedFilms.forEach((film) => {
            this._store.setItem(film.id, film);
          });

          this._isSynchronized = true;

          return Promise.resolve();
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  isSynchronized() {
    return this._isSynchronized;
  }

  _isOnLine() {
    return window.navigator.onLine;
  }
}
