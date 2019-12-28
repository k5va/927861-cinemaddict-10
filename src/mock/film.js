import {getRandomArrayItem, getRandomInteger, getRandomBoolean, getRandomDate} from "../utils";

const MAX_DESCRIPTION_SIZE = 3;
const DEFAULT_FILMS_COUNT = 15;

const GENRES = [`comedy`, `drama`, `action`, `horror`, `thriller`];

const FILM_NAMES = [
  `День сурка`,
  `Один дома`,
  `Семейка Аддамс`,
  `Отпетые мошенники`,
  `Смерть ей к лицу`,
  `За бортом`,
  `Как в старое доброе время`,
  `Самолетом, поездом, машиной`,
  `Дядюшка Бак`,
  `Рождественские каникулы`,
  `Скрудж`,
  `А как же Боб?`,
  `Сплошные неприятности`,
  `Охотники за приведениями`,
  `Полицейская академия`
];

const FILM_POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const FILM_DESCRIPTIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  .split(`.`);

const FILM_COMMENTS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  .split(`.`);

/**
 * Generates random film description
 * @return {String} - film description
 */
const generateDescription = () => {
  const start = getRandomInteger(0, FILM_DESCRIPTIONS.length - 1);

  return FILM_DESCRIPTIONS.slice(start, start + MAX_DESCRIPTION_SIZE).join(`.`);
};

/**
 * Generates random poster
 * @return {String} poster URL
 */
const generatePoster = () => `./images/posters/${getRandomArrayItem(FILM_POSTERS)}`;

/**
 * Generated random comments array
 * @return {Array<*>} - array of generated comments
 */
const generateComments = () => FILM_COMMENTS
  .slice(getRandomInteger(0, FILM_COMMENTS.length), FILM_COMMENTS.length)
  .map((text, index) => ({
    id: String(index),
    text,
    author: `John Doe`,
    date: getRandomDate(),
    emoji: `smiling`
  }));

/**
 * Generates random film rating
 * @return {Number} - generated rating
 */
const generateRating = () => getRandomInteger() + 0.1;

/**
 * Generates random film
 * @param {Number} index - array index of new film
 * @return {*} - film object
 */
const generateFilm = (index = 0) => {
  return {
    id: index,
    title: FILM_NAMES[index],
    originalTitle: `Lorem ipsum dolor sit amet`,
    poster: generatePoster(),
    rating: generateRating(),
    userRating: 5,
    releaseDate: getRandomDate(),
    duration: `1h 36m`,
    genres: new Set(GENRES.slice(getRandomInteger(0, GENRES.length - 1))),
    description: generateDescription(),
    country: `USA`,
    age: `12+`,
    isFavorite: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    watchingDate: getRandomDate(new Date(`2019-11-01`)),
    isWatchlistAdded: getRandomBoolean(),
    director: `John Doe`,
    writers: [`John Doe`, `Vasya Pupkin`],
    actors: [`Chevy Chase`, `Dan Aykroyd`, `John Candy`],
    comments: generateComments()
  };
};

/**
 * Generates given number of films
 * @param {Number} count - number of films to generate
 * @return {Array<*>} - array of generated films
 */
const generateFilms = (count = DEFAULT_FILMS_COUNT) => new Array(count)
  .fill(``)
  .map((_, index) => generateFilm(index));

export {generateFilms};
