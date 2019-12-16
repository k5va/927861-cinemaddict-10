/**
 * Generates genres markup
 * @param {Set<*>} genres - Set of genres
 * @return {String} - genres markup
 */
const generateGenreMarkup = (genres) => [...genres]
  .map((genre) => `<span class="film-details__genre">${genre}</span>`)
  .join(``);

export {generateGenreMarkup};
