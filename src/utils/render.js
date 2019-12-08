const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
  BEFORE_BEGIN: `beforebegin`,
  AFTER_END: `afterend`
};

/**
 * Renders given component to the DOM by adding it to the parent container
 * at the specified position
 * @param {HTMLElement} container - parent HTML element
 * @param {Component} component - component to be added to the container
 * @param {String} place - insert position. Default value = "beforeend"
 */
const render = (container, component, place = RenderPosition.BEFORE_END) => {
  container.insertAdjacentElement(place, component.getElement());
};

export {render, RenderPosition};
