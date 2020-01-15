import {checkStatus} from "./check-status";
import {Film, Comment} from "../models";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export default class API {

  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  /**
   * Get films list from server
   * @return {Promise<Array<Film>>} - promise that resolves with array of films
   */
  getFilms() {
    return this._send({url: `movies`})
      .then((response) => response.json())
      .then(Film.parseFilms)
      .then((films) => Promise.all(films.map((film) => this._loadComments(film))));
  }

  /**
   * Loads comments in given film from server
   * @param {Film} film - film
   * @return {Promise<Film>} - promise that resolves to gilm with loaded comments
   */
  _loadComments(film) {
    return this._send({url: `comments/${film.id}`})
      .then((response) => response.json())
      .then(Comment.parseComments)
      .then((comments) => film.setComments(comments));
  }

  /**
   * Updates film on server
   * @param {Film} film - film
   * @return {Promise<Film>} - promise that resolves to updated film
   */
  updateFilm(film) {
    return this._send({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(film.toRAW(false)),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Film.parseFilm)
      .then((it) => this._loadComments(it));
  }

  /**
   * Creates new comment on server
   * @param {String} filmId - film id
   * @param {Object} comment - comment
   * @return {Promise<Film>} - promise that resolves to updated film
   */
  createComment(filmId, comment) {
    return this._send({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(comment.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Film.parseFilmWithComments);
  }

  /**
   * Deletes comment on server
   * @param {String} id - comment id
   * @return {Promise<String>} - promise that resoves to deleted comment id
   */
  deleteComment(id) {
    return this._send({url: `comments/${id}`, method: Method.DELETE})
      .then(() => id);
  }

  sync(data) {
    return this._send({
      url: `movies/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json());
  }

  /**
   * Sends request to server
   * @return {Promise<Response>} - promise that resoves to server response if it is successfull
   */
  _send({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
