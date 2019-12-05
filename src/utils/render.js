const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`
};

/**
 * Renders given component to the DOM by adding it to the parent container
 * at the specified position
 * @param {HTMLElement} container - parent HTML element
 * @param {Component} component - component to be added to the container
 * @param {String} place - insert position. Default value = "beforeend"
 */
const render = (container, component, place = RenderPosition.BEFORE_END) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFORE_END:
      container.append(component.getElement());
      break;
  }
};

export {render, RenderPosition};
