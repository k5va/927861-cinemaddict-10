/**
 * Creates footer statistics template
 * @param {Array<*>} films - array of all films
 * @return {String} template
 */
export const createFooterStatisticsTemplate = (films) => {
  return `<section class="footer__statistics">
            <p>${films.length} movies inside</p>
          </section>`;
};
