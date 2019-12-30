import {StatisticsFilter} from "../../consts";
import moment from "moment";

const DateFilter = {
  [StatisticsFilter.ALL]: (watchingDate) => !!watchingDate,
  [StatisticsFilter.TODAY]: (watchingDate) => !!watchingDate && watchingDate > moment(new Date()).subtract(1, `day`),
  [StatisticsFilter.WEEK]: (watchingDate) => !!watchingDate && watchingDate > moment(new Date()).subtract(1, `week`),
  [StatisticsFilter.MONTH]: (watchingDate) => !!watchingDate && watchingDate > moment(new Date()).subtract(1, `month`),
  [StatisticsFilter.YEAR]: (watchingDate) => !!watchingDate && watchingDate > moment(new Date()).subtract(1, `year`),
};

const findWatchedFilms = (films, period) => films.filter(({watchingDate}) => DateFilter[period](watchingDate));

export {findWatchedFilms};
