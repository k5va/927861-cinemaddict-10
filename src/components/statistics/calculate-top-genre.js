/**
 * Returns top watched film genre
 * @param {Array} films - array of films
 * @return {String} - top genre
 */
const calculateTopGenre = (films) => {
  const uniqueGenres = [...new Set(films.reduce((acc, {genres}) => [...acc, ...genres], []))];
  const topGenre = uniqueGenres.reduce((acc, genre) => {
    return films.filter(({genres}) => [...genres].includes(genre)).length >
      films.filter(({genres}) => [...genres].includes(acc)).length ? genre : acc;
  });

  return topGenre;
};

export {calculateTopGenre};
