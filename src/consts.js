export const FILM_GENRE_SPLIT = ` `;

export const MAX_SHORT_DESCRIPTION_SIZE = 140;

export const USER_RATING_COUNT = 9;

export const TOP_RATED_FILMS_COUNT = 2;

export const MOST_COMMENTED_FILMS_COUNT = 2;

export const UserTitle = {
  NO_TITLE: ``,
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BUFF: `movie buff`
};

export const FILMS_ON_PAGE = 5;

export const SortType = {
  DATE: `date`,
  RATING: `sort`,
  DEFAULT: `default`,
};

export const NO_USER_RATING = 0;

export const CommentEmoji = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`
};

export const CommentEmojiImages = {
  [CommentEmoji.SMILE]: `smile.png`,
  [CommentEmoji.SLEEPING]: `sleeping.png`,
  [CommentEmoji.PUKE]: `puke.png`,
  [CommentEmoji.ANGRY]: `angry.png`
};

export const Filter = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

export const MenuItem = {
  ALL: Filter.ALL,
  WATCHLIST: Filter.WATCHLIST,
  HISTORY: Filter.HISTORY,
  FAVORITES: Filter.FAVORITES,
  STAT: `stat`
};

export const MenuItemText = {
  [MenuItem.ALL]: `All movies`,
  [MenuItem.WATCHLIST]: `Watchlist`,
  [MenuItem.HISTORY]: `History`,
  [MenuItem.FAVORITES]: `Favorites`,
  [MenuItem.STAT]: `Stat`
};

export const COMMENT_DATE_FORMAT = `YYYY/MM/DD HH:MM`;

export const HIDDEN_CLASS = `visually-hidden`;

export const StatisticsFilter = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const MINUTES_IN_HOUR = 60;

export const AUTHORIZATION = `Basic dXNqweBwYXNzd29yZAo=`;

export const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;

export const SHAKE_ANIMATION_TIMEOUT = 600;

const STORE_PREFIX = `cinemaaddict-localstorage`;

const STORE_VER = `v1`;

export const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

