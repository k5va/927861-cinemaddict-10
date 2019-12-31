import {MINUTES_IN_HOUR} from "../consts";
/**
 * Formates time minutes to string
 * @param {Number} duration - minutes
 * @return {String} - formated time
 */
const formatTime = (duration) => {
  const hours = Math.floor(duration / MINUTES_IN_HOUR);
  const minutes = duration % MINUTES_IN_HOUR;

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export {formatTime};
