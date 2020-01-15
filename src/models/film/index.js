import Comment from "../comment";

export default class Film {

  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`] || ``;
    this.originalTitle = data[`film_info`][`alternative_title`] || ``;
    this.poster = data[`film_info`][`poster`];
    this.rating = data[`film_info`][`total_rating`];
    this.userRating = data[`user_details`][`personal_rating`];
    this.releaseDate = data[`film_info`][`release`][`date`] ?
      new Date(data[`film_info`][`release`][`date`]) : null;
    this.duration = data[`film_info`][`runtime`];
    this.genres = new Set(data[`film_info`][`genre`] || []);
    this.description = data[`film_info`][`description`] || ``;
    this.country = data[`film_info`][`release`][`release_country`] || ``;
    this.age = data[`film_info`][`age_rating`];
    this.isFavorite = Boolean(data[`user_details`][`favorite`]);
    this.isWatched = Boolean(data[`user_details`][`already_watched`]);
    this.watchingDate = data[`user_details`][`watching_date`] ?
      new Date(data[`user_details`][`watching_date`]) : null;
    this.isWatchlistAdded = Boolean(data[`user_details`][`watchlist`]);
    this.director = data[`film_info`][`director`] || ``;
    this.writers = data[`film_info`][`writers`] || [];
    this.actors = data[`film_info`][`actors`] || [];
    this.comments = data[`comments`] ? data[`comments`].map((item) => Comment.parseComment(item)) : [];
  }

  /**
   * Converts film object to raw data that conforms to server format
   * @return {Object} - raw object
   */
  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments.map((comment) => comment.toRAW()),
      'film_info': {
        'title': this.title,
        'alternative_title': this.originalTitle,
        'total_rating': this.rating,
        'poster': this.poster,
        'age_rating': this.age,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': this.releaseDate.toISOString(),
          'release_country': this.country
        },
        'runtime': this.duration,
        'genre': [...this.genres],
        'description': this.description
      },
      'user_details': {
        'personal_rating': this.userRating,
        'watchlist': this.isWatchlistAdded,
        'already_watched': this.isWatched,
        'watching_date': this.watchingDate,
        'favorite': this.isFavorite
      }
    };
  }

  /**
   * Sets film's comments
   * @param {Array<Comment>} comments - array of comments
   * @return {Film} - self
   */
  setComments(comments) {
    this.comments = [...comments];
    return this;
  }

  /**
   * Creates new Film from raw data
   * @param {Object} data - raw data
   * @return {Film} - created film
   */
  static parseFilm(data) {
    return new Film(data);
  }

  /**
   * Creates array of Films from given raw data
   * @param {Array<Object>} data - array of raw film data
   * @return {Array<Film>} - array of films
   */
  static parseFilms(data) {
    return data.map(Film.parseFilm);
  }

  /**
   * Creates a copy of film
   * @param {Film} film - film
   * @return {Film} - new film
   */
  static clone(film) {
    return new Film(film.toRAW());
  }

  /**
   * Creates new Film with raw data
   * @return {Film} - film
   */
  static parseFilmWithComments({movie, comments}) {
    const film = Film.parseFilm(movie);
    film.setComments(Comment.parseComments(comments));

    return film;
  }
}
