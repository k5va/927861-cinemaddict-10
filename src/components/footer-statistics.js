import Component from "./component";
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

export default class FooterStatistics extends Component {
  constructor(films) {
    super(createFooterStatisticsTemplate(films));
  }
}
