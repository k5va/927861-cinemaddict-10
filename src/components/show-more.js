import Component from "./component";

/**
 * Creates show more template
 * @return {String} template
 */
export const createShowMoreTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMore extends Component {
  constructor() {
    super(createShowMoreTemplate());
  }
}
