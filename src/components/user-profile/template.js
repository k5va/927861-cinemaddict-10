import {generateUserTitle} from "../../utils";

/**
 * Creates user profile template
 * @param {Array<*>} films - array of all films
 * @return {String} template
 */
const template = (films) => {
  const userTitle = generateUserTitle(films);

  return `<section class="header__profile profile">
    <p class="profile__rating">${userTitle}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export {template};
