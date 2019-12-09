/**
 * Creates footer statistics template
 * @param {Array<*>} films - array of all films
 * @return {String} template
 */
const template = (films) => {
  return `<section class="footer__statistics">
            <p>${films.length} movies inside</p>
          </section>`;
};

export {template};
