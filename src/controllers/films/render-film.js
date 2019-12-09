import {FilmComponent, FilmDetailsComponent} from "../../components";
import {render} from "../../utils";

/**
* Creates film component and renders it to the DOM with open details mode support
* @param {*} film - film object
* @param {Component} filmsComponent - films component to render film
*/
const renderFilm = (film, filmsComponent) => {
  const filmComponent = new FilmComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Esc` || evt.key === `Escape`;

    if (isEscKey) {
      closeFilmDetails();
    }
  };

  /**
  * Closes film details info
  */
  const closeFilmDetails = () => {
    filmDetailsComponent.removeElement();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  /**
   * Shows film details info
   */
  const showFilmDetails = () => {
    render(filmsComponent.getElement(), filmDetailsComponent);
    filmDetailsComponent.setCloseHandler(() => {
      // remove film details component from the DOM
      closeFilmDetails();
    });
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  // register show film details handler
  filmComponent.setShowDetailsHandler(showFilmDetails);

  // render film component
  render(filmsComponent.getListContainer(), filmComponent);
};

export {renderFilm};
