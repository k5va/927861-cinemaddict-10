import {replaceElements} from "./replaceElements";

/**
 * Replaces two given components
 * @param {Component} newComponent - repacing component
 * @param {Component} oldComponent  - replaced component
 */
const replace = (newComponent, oldComponent) => {
  replaceElements(newComponent.getElement(), oldComponent.getElement());
};

export {replace};
