import {render} from "./utils.js";
import {createProfileTemplate} from "./view/profile.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsTemplate} from "./view/films.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createLoadMoreTemplate} from "./view/more-button.js";
import {createFilmsListExtraTemplate} from "./view/films-list-extra.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";

const FilmsCounter = {
  MAIN_LIST: 5,
  EXTRA: 2
};

const ExtraHeading = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`
};

const films = new Array(20).fill().map(generateFilm);
const filters = generateFilter(films);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

// Рендерим шапку
render(headerElement, createProfileTemplate());

// Рендерим мейн
render(mainElement, createNavigationTemplate(filters));
render(mainElement, createSortTemplate());
render(mainElement, createFilmsTemplate());

// Рендерим списки фильмов
const filmsElement = mainElement.querySelector(`.films`);
render(filmsElement, createFilmsListTemplate());

const filmsListElement = mainElement.querySelector(`.films-list`);
render(filmsListElement, createLoadMoreTemplate());

render(filmsElement, createFilmsListExtraTemplate(ExtraHeading.TOP_RATED));
render(filmsElement, createFilmsListExtraTemplate(ExtraHeading.MOST_COMMENTED));

// Рендерим карточки с фильмами
const filmsListMainElement = filmsListElement.querySelector(`.films-list__container`);
for (let i = 0; i < FilmsCounter.MAIN_LIST; i++) {
  render(filmsListMainElement, createFilmCardTemplate(films[i]));
}

const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);
filmsListExtraElements.forEach((filmsListExtraElement) => {
  const containerElement = filmsListExtraElement.querySelector(`.films-list__container`);
  for (let i = 0; i < FilmsCounter.EXTRA; i++) {
    render(containerElement, createFilmCardTemplate(films[i]));
  }
}
);

// Рендерим футер
render(footerElement, createStatisticsTemplate());

// Рендерим попап
// render(footerElement, createFilmDetailsTemplate(films[0]), `afterend`);
