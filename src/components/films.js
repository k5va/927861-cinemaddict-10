import Component from "./component";

/**
 * Creates main film list template
 * @return {String} template
 */
export const createFilmsTemplate = () => {
  return `<section class="films-list">
            <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
            <div class="films-list__container">
            </div>
          </section>`;
};

export default class Films extends Component {
  constructor() {
    super(createFilmsTemplate());
  }

  getListContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
