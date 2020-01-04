import {StatisticsFilter} from "../../consts";
import moment from "moment";

const DateFilter = {
  [StatisticsFilter.ALL]: (isWatched) => isWatched,
  [StatisticsFilter.TODAY]: (isWatched, watchingDate) => isWatched &&
    watchingDate > moment(new Date()).subtract(1, `day`),
  [StatisticsFilter.WEEK]: (isWatched, watchingDate) => isWatched &&
    watchingDate > moment(new Date()).subtract(1, `week`),
  [StatisticsFilter.MONTH]: (isWatched, watchingDate) => isWatched &&
    watchingDate > moment(new Date()).subtract(1, `month`),
  [StatisticsFilter.YEAR]: (isWatched, watchingDate) => isWatched &&
    watchingDate > moment(new Date()).subtract(1, `year`),
};

const findWatchedFilms = (films, period) =>
  films.filter(({isWatched, watchingDate}) => DateFilter[period](isWatched, watchingDate));

export {findWatchedFilms};
