import Component from "./component";

/**
 * Creates top rated films template
 * @return {String} template
 */
export const createMostCommentedFilmsTemplate = () => {
  return `<section class="films-list--extra films-list--most-commented">
            <h2 class="films-list__title">Most commented</h2>
            <div class="films-list__container">
            </div>
          </section>`;
};

export default class MostCommentedFilms extends Component {
  constructor() {
    super(createMostCommentedFilmsTemplate());
  }

  getListContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
