import {EMOJIS} from "../const.js";

const lines = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];
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
const names = [`Anna Adams`, `Betty Brown`, `Chris Costner`, `David Doe`, `Edith Edisson`, `Frank Farmer`, `George Gatsby`];
const countries = [`USA`, `UK`, `USSR`];
const ages = [`0+`, `6+`, `12+`, `18+`];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function generateDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const generateComment = () => {
  const text = lines[getRandomInteger(0, lines.length - 1)];
  const emoji = EMOJIS[getRandomInteger(0, EMOJIS.length - 1)];

  return {
    emoji,
    date: generateDate(new Date(2020, 0, 1), new Date()),
    author: names[getRandomInteger(0, names.length - 1)],
    text
  };
};

const generateDescription = () => {
  const descriptionLength = getRandomInteger(1, 5);
  let description = new Array(descriptionLength).fill().reduce((acc) => acc + lines[getRandomInteger(0, lines.length - 1)], ``);

  return description;
};

const generateGenres = () => {
  const genresCount = getRandomInteger(1, 3);
  let filmGenres = new Array(genresCount).fill().map(() => genres[getRandomInteger(0, genres.length - 1)]);

  return filmGenres;
};


export const generateFilm = () => {
  const comments = new Array(getRandomInteger(0, 5)).fill().map(generateComment);
  const writers = new Array(2).fill().map(() => names[getRandomInteger(0, names.length - 1)]);
  const actors = new Array(3).fill().map(() => names[getRandomInteger(0, names.length - 1)]);
  return {
    title: titles[getRandomInteger(0, titles.length - 1)],
    originalTitle: originalTitles[getRandomInteger(0, originalTitles.length - 1)],
    poster: posters[getRandomInteger(0, posters.length - 1)],
    description: generateDescription(),
    rating: getRandomInteger(1, 10),
    director: names[getRandomInteger(0, names.length - 1)],
    writers,
    actors,
    release: generateDate(new Date(1900, 0, 1), new Date(2020, 0, 1)),
    runtime: getRandomInteger(5, 180),
    country: countries[getRandomInteger(0, countries.length - 1)],
    genres: generateGenres(),
    age: ages[getRandomInteger(0, ages.length - 1)],
    comments,
    inWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
