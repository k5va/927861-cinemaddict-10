const DEBOUNCE_INTERVAL = 500;

/**
 * Debounces given function - returns new function, that calls callback only after DEBOUNCE_INTERVAL is passed
 * @param {function} callback - callback function
 * @return {function} - debounced function
 */
const debounce = (callback) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(() => callback(...parameters), DEBOUNCE_INTERVAL);
  };
};

export {debounce};
