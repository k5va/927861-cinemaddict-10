import {UserTitle} from "../../consts";

/**
 * Creates user profile template
 * @param {Array<*>} films - array of all films
 * @return {String} template
 */
const template = (films) => {
  const watchedFilmsCount = films.filter(({isWatched}) => isWatched).length;

  let userTitle = UserTitle.NO_TITLE;
  if (watchedFilmsCount >= 1 && watchedFilmsCount < 11) {
    userTitle = UserTitle.NOVICE;
  } else if (watchedFilmsCount >= 11 && watchedFilmsCount < 20) {
    userTitle = UserTitle.FAN;
  } else if (watchedFilmsCount >= 21) {
    userTitle = UserTitle.MOVIE_BUFF;
  }

  return `<section class="header__profile profile">
    <p class="profile__rating">${userTitle}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export {template};
