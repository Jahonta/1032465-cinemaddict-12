const EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];
const LINES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];
const TITLES = [
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

const ORIGINAL_TITLES = [
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

const POSTERS = [
  `images/posters/the-dance-of-life.jpg`,
  `images/posters/made-for-each-other.png`,
  `images/posters/popeye-meets-sinbad.png`,
  `images/posters/sagebrush-trail.jpg`,
  `images/posters/santa-claus-conquers-the-martians.jpg`,
  `images/posters/the-great-flamarion.jpg`,
  `images/posters/the-man-with-the-golden-arm.jpg`
];

const NAMES = [`Anna`, `Betty`, `Chris`, `David`, `Edith`, `Frank`, `George`];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateComment = () => {
  const message = LINES[getRandomInteger(0, LINES.length - 1)];
  const emotion = EMOTIONS[getRandomInteger(0, EMOTIONS.length - 1)];

  return {
    emotion,
    date: generateDate(new Date(2020, 0, 1), new Date()),
    author: NAMES[getRandomInteger(0, NAMES.length - 1)],
    message
  };
};

function generateDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const generateDescription = () => {
  const descriptionLength = getRandomInteger(1, 5);
  let description = new Array(descriptionLength).fill(``).reduce((acc) => {
    return acc + LINES[getRandomInteger(0, LINES.length - 1)];
  }, ``);

  return description;
};

export const generateFilm = () => {
  const comments = new Array(getRandomInteger(0, 5)).fill().map(generateComment);
  return {
    title: TITLES[getRandomInteger(0, TITLES.length - 1)],
    originalTitle: ORIGINAL_TITLES[getRandomInteger(0, ORIGINAL_TITLES.length - 1)],
    poster: POSTERS[getRandomInteger(0, POSTERS.length - 1)],
    description: generateDescription(),
    rating: getRandomInteger(1, 10),
    director: `director`,
    writers: `writers`,
    cast: `cast`,
    date: generateDate(new Date(1900, 0, 1), new Date(2020, 0, 1)),
    duration: getRandomInteger(5, 360),
    country: `country`,
    genres: [`Epic`],
    age: `age`,
    comments,
    inWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};


