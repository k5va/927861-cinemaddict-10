/**
 * Creates menu template
 * @param {Array<*>} menuItems - array of all menu items
 * @param {String} selectedItem - selected menu item
 * @return {String} template
 */
const template = (menuItems) => {
  const menuItemsMarkup = menuItems.map(({name, text, count, isCountHidden, isSelected, isAdditional}) => {
    return `<a href="#" class="main-navigation__item
              ${isSelected ? `main-navigation__item--active` : ``}
              ${isAdditional ? `main-navigation__item--additional` : ``}"
              data-menu-item="${name}"
            >
              ${text}
              ${!isCountHidden && count ? ` <span class="main-navigation__item-count">${count}</span>` : ``}
            </a>`;
  }).join(``);

  return `<nav class="main-navigation">${menuItemsMarkup}</nav>`;
};

export {template};
