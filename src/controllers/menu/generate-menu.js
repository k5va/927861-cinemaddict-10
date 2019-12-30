import {MenuItem, MenuItemText} from "../../consts";
import {FilterFilms} from "../../utils";

/**
 * Generates menu
 * @param {Array<*>} films - array of films
 * @param {String} selectedMenuItem - selected menu item
 * @return {Array<*>} - array of menu items
 */
const generateMenu = (films, selectedMenuItem) => Object.values(MenuItem)
  .map((menuItem) => ({
    name: menuItem,
    text: MenuItemText[menuItem],
    count: FilterFilms[menuItem] ? FilterFilms[menuItem](films).length : null,
    isCountHidden: menuItem === MenuItem.ALL,
    isSelected: menuItem === selectedMenuItem,
    isAdditional: menuItem === MenuItem.STAT
  }));

export {generateMenu};
