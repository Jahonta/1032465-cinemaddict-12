import {NAMES, LINES} from "../const.js";
import {getRandomInteger, generateDate} from "../utils/common.js";

const titles = [
  `Побег из Шоушенка`,
  `Крестный отец`,
  `Темный рыцарь`,
  `12 разгневанных мужчин`,
  `Список Шиндлера`,
  `Криминальное чтиво`,
  `Хороший, плохой, злой`,
  `Бойцовский клуб`,
  `Форрест Гамп`,
  `Начало`
];
const originalTitles = [
  `The Shawshank Redemption`,
  `The Godfather`,
  `The Dark Knight`,
  `12 Angry Men`,
  `Schindler's List`,
  `Pulp Fiction`,
  `Il buono, il brutto, il cattivo`,
  `Fight Club`,
  `Forrest Gump`,
  `Inception`
];
const posters = [
  `images/posters/the-dance-of-life.jpg`,
  `images/posters/made-for-each-other.png`,
  `images/posters/popeye-meets-sinbad.png`,
  `images/posters/sagebrush-trail.jpg`,
  `images/posters/santa-claus-conquers-the-martians.jpg`,
  `images/posters/the-great-flamarion.jpg`,
  `images/posters/the-man-with-the-golden-arm.jpg`
];
const genres = [`Cartoon`, `Comedy`, `Drama`, `Western`, `Musical`];
const countries = [`USA`, `UK`, `USSR`];
const ages = [`0+`, `6+`, `12+`, `18+`];

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateDescription = () => {
  const descriptionLength = getRandomInteger(1, 5);
  let description = new Array(descriptionLength).fill().reduce((acc) => acc + LINES[getRandomInteger(0, LINES.length - 1)], ``);

  return description;
};

const generateGenres = () => {
  const genresCount = getRandomInteger(1, 3);
  let filmGenres = new Array(genresCount).fill().map(() => genres[getRandomInteger(0, genres.length - 1)]);

  return filmGenres;
};


export const generateFilm = () => {
  const writers = new Array(2).fill().map(() => NAMES[getRandomInteger(0, NAMES.length - 1)]);
  const actors = new Array(3).fill().map(() => NAMES[getRandomInteger(0, NAMES.length - 1)]);
  return {
    id: generateId(),
    title: titles[getRandomInteger(0, titles.length - 1)],
    originalTitle: originalTitles[getRandomInteger(0, originalTitles.length - 1)],
    poster: posters[getRandomInteger(0, posters.length - 1)],
    description: generateDescription(),
    rating: getRandomInteger(1, 10),
    director: NAMES[getRandomInteger(0, NAMES.length - 1)],
    writers,
    actors,
    release: generateDate(new Date(1900, 0, 1), new Date(2020, 0, 1)),
    runtime: getRandomInteger(5, 180),
    country: countries[getRandomInteger(0, countries.length - 1)],
    genres: generateGenres(),
    age: ages[getRandomInteger(0, ages.length - 1)],
    inWatchlist: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    isFavorite: Boolean(getRandomInteger())
  };
};
