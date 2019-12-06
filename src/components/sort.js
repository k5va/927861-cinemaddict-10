import Component from "./component";
/**
 * Creates sort template
 * @return {String} template
 */
export const createSortTemplate = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;
};

export default class Sort extends Component {
  constructor() {
    super(createSortTemplate());
  }
}
