import {Filter} from "../consts";

export const FilterFilms = {
  [Filter.ALL]: (films) => films,
  [Filter.WATCHLIST]: (films) => films.filter(({isWatchlistAdded}) => isWatchlistAdded),
  [Filter.HISTORY]: (films) => films.filter(({isWatched}) => isWatched),
  [Filter.FAVORITES]: (films) => films.filter(({isFavorite}) => isFavorite)
};
