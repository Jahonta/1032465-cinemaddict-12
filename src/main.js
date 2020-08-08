import {render} from "./utils.js";
import {createProfileTemplate} from "./view/profile.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsTemplate} from "./view/films.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createLoadMoreTemplate} from "./view/more-button.js";
import {createTopRatedFilmsTemplate} from "./view/top-rated-films.js";
import {createMostCommentedFilmsTemplate} from "./view/most-commented-films.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";

const FILMS_COUNT = 30;
const FILMS_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filmsByRating = [...films].sort((a, b) => a.rating < b.rating);
const filmsByComments = [...films].sort((a, b) => a.comments.length < b.comments.length);
const filters = generateFilter(films);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

// Рендерим шапку
render(headerElement, createProfileTemplate(filters.history));

// Рендерим мейн
render(mainElement, createNavigationTemplate(filters));
render(mainElement, createSortTemplate());
render(mainElement, createFilmsTemplate());

// Рендерим списки фильмов
const filmsElement = mainElement.querySelector(`.films`);
render(filmsElement, createFilmsListTemplate());

const filmsListElement = mainElement.querySelector(`.films-list`);
if (films.length > FILMS_COUNT_PER_STEP) {
  render(filmsListElement, createLoadMoreTemplate());

  const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;
  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(filmsListMainElement, createFilmCardTemplate(film)));
    renderedFilmsCount += FILMS_COUNT_PER_STEP;
    if (renderedFilmsCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

render(filmsElement, createTopRatedFilmsTemplate(films));
render(filmsElement, createMostCommentedFilmsTemplate(films));

// Рендерим карточки с фильмами
const filmsListMainElement = filmsListElement.querySelector(`.films-list__container`);
for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  render(filmsListMainElement, createFilmCardTemplate(films[i]));
}

const [topRatedElement, mostCommentedElement] = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);
for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
  render(topRatedElement, createFilmCardTemplate(filmsByRating[i]));
  render(mostCommentedElement, createFilmCardTemplate(filmsByComments[i]));
}

// Рендерим футер
render(footerElement, createStatisticsTemplate(films.length));

// Рендерим попап
render(footerElement, createFilmDetailsTemplate(films[0]), `afterend`);
