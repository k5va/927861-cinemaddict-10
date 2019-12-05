/**
 * Creates HTML element from given template
 * @param {String} template - template to create HTML element from
 * @return {HTMLElement} - created element
 */
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {createElement};
