export const FilterFilms = {
  all: (films) => films,
  watchlist: (films) => films.filter(({isWatchlistAdded}) => isWatchlistAdded),
  history: (films) => films.filter(({isWatched}) => isWatched),
  favorites: (films) => films.filter(({isFavorite}) => isFavorite)
};
