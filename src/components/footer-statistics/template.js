/**
 * Creates footer statistics template
 * @param {Number} filmsCount - number of all films
 * @return {String} template
 */
const template = (filmsCount) => {
  return `<section class="footer__statistics">
            <p>${filmsCount} movies inside</p>
          </section>`;
};

export {template};
