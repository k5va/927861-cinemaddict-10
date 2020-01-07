/**
 * Creates top rated films template
 * @param {String} message - message to display
 * @return {String} template
 */
const template = (message) => {
  return `<section class="films">
            <section class="films-list">
              <h2 class="films-list__title">${message ? message : ``}</h2>
            </section>
          </section>`;
};

export {template};
