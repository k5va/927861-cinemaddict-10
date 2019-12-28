import {UserTitle} from "../consts";

const generateUserTitle = (films) => {
  const watchedFilmsCount = films.filter(({isWatched}) => isWatched).length;

  let userTitle = UserTitle.NO_TITLE;
  if (watchedFilmsCount >= 1 && watchedFilmsCount < 11) {
    userTitle = UserTitle.NOVICE;
  } else if (watchedFilmsCount >= 11 && watchedFilmsCount < 20) {
    userTitle = UserTitle.FAN;
  } else if (watchedFilmsCount >= 21) {
    userTitle = UserTitle.MOVIE_BUFF;
  }

  return userTitle;
};

export {generateUserTitle};
