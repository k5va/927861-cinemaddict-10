import {FilmComponent, FilmDetailsComponent} from "../../components";
import {render, replace} from "../../utils";

const FilmMode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class FilmController {
  /**
  * Creates an instance of TaskController.
  * @param {FilmListComponent} container - container component to add films to
  * @param {Function} onDataChange - data change handler
  * @param {Function} onViewChange - view change handler
  */
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = FilmMode.DEFAULT;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._showFilmDetails = this._showFilmDetails.bind(this);
  }

  /**
   * Renders given film a
   * @param {*} film - film object
   */
  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    // register show film details handler
    this._filmComponent.setShowDetailsHandler(this._showFilmDetails);

    if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      // render film component
      render(this._container.getListContainer(), this._filmComponent);
    }
  }

  /**
  * Handler for Esc key down event
  * @param {KeyboardEvent} evt - event object
  */
  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Esc` || evt.key === `Escape`;

    if (isEscKey) {
      this._closeFilmDetails();
    }
  }

  /**
   * Shows film details info
   */
  _showFilmDetails() {

    if (this._mode === FilmMode.DETAILS) {
      return;
    }

    // fire view change event
    this._onViewChange();

    render(this._container.getElement(), this._filmDetailsComponent);
    this._filmDetailsComponent.setCloseHandler(() => {
      // remove film details component from the DOM
      this._closeFilmDetails();
    });
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = FilmMode.DETAILS;
  }


  /**
  * Closes film details info
  */
  _closeFilmDetails() {
    this._filmDetailsComponent.removeElement();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = FilmMode.DEFAULT;
  }

  /**
   * Sets controller to default view
   */
  setDefaultView() {
    if (this._mode !== FilmMode.DEFAULT) {
      this._closeFilmDetails();
    }
  }
}
