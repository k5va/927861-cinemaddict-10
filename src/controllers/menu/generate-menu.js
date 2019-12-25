import {MenuItem, MenuItemText} from "../../consts";
import {FilterFilms} from "../../utils";

/**
 * Generates menu
 * @param {Array<*>} films - array of films
 * @param {String} selectedMenuItem - selected menu item
 * @return {Array<*>} - array of menu items
 */
const generateMenu = (films, selectedMenuItem) => Object.keys(MenuItem)
  .map((key) => ({
    name: MenuItem[key],
    text: MenuItemText[MenuItem[key]],
    count: FilterFilms[MenuItem[key]] ? FilterFilms[MenuItem[key]](films).length : null,
    isCountHidden: MenuItem[key] === MenuItem.ALL,
    isSelected: MenuItem[key] === selectedMenuItem,
    isAdditional: MenuItem[key] === MenuItem.STAT
  }));

export {generateMenu};
