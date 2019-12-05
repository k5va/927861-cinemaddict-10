import Component from "./component";

/**
 * Creates top rated films template
 * @return {String} template
 */
export const createTopRatedFilmsTemplate = () => {
  return `<section class="films-list--extra films-list--top-rated">
            <h2 class="films-list__title">Top rated</h2>
            <div class="films-list__container">
            </div>
          </section>`;
};

export default class TopRatedFilms extends Component {
  constructor() {
    super(createTopRatedFilmsTemplate());
  }

  getListContainer() {
    return this._element.querySelector(`.films-list__container`);
  }
}
