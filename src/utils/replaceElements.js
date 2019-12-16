/**
 * Replaces two given elements
 * @param {HTMLElement} newElement - repacing element
 * @param {HTMLElement} oldElement  - replaced element
 */
const replaceElements = (newElement, oldElement) => {
  const parentElement = oldElement.parentElement;

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    // save scroll position
    const {scrollTop, scrollLeft} = oldElement;
    // reset animation
    newElement.style.animationDuration = `0s`;
    // replace elements
    parentElement.replaceChild(newElement, oldElement);
    // restore scroll position
    newElement.scrollTop = scrollTop;
    newElement.scrollLeft = scrollLeft;
  }
};

export {replaceElements};
