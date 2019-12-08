/**
 * Creates menu template
 * @param {Array<*>} films - array of all films
 * @return {String} template
 */
const template = (films) => {
  const watchlistCount = films.filter(({isWatchlistAdded}) => isWatchlistAdded).length;
  const watchedCount = films.filter(({isWatched}) => isWatched).length;
  const favoritesCount = films.filter(({isFavorite}) => isFavorite).length;

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">
        Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
      <a href="#history" class="main-navigation__item">
        History <span class="main-navigation__item-count">${watchedCount}</span></a>
      <a href="#favorites" class="main-navigation__item">
        Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`);
};

export {template};
