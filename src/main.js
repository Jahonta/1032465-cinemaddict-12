import {render} from "./utils.js";
import ProfileView from "./view/profile.js";
import NavigationView from "./view/navigation.js";
import SortView from "./view/sort.js";
import FilmsView from "./view/films.js";
import FilmsListView from "./view/films-list.js";
import LoadMoreButtonView from "./view/load-more-button.js";
import TopRatedFilmsView from "./view/top-rated-films.js";
import MostCommentedFilmsView from "./view/most-commented-films.js";
import FilmCardView from "./view/film-card.js";
import StatisticsView from "./view/statistics.js";
import FilmDetailsView from "./view/film-details.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";

const FILMS_COUNT = 20;
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
render(headerElement, new ProfileView(filters.history).getElement());

// Рендерим мейн
render(mainElement, new NavigationView(filters).getElement());
render(mainElement, new SortView().getElement());
render(mainElement, new FilmsView().getElement());

// Рендерим списки фильмов
const filmsElement = mainElement.querySelector(`.films`);
render(filmsElement, new FilmsListView().getElement());

const filmsListElement = mainElement.querySelector(`.films-list`);
if (films.length > FILMS_COUNT_PER_STEP) {
  render(filmsListElement, new LoadMoreButtonView().getElement());

  const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;
  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(filmsListMainElement, new FilmCardView(film).getElement()));
    renderedFilmsCount += FILMS_COUNT_PER_STEP;
    if (renderedFilmsCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

render(filmsElement, new TopRatedFilmsView().getElement());
render(filmsElement, new MostCommentedFilmsView().getElement());

// Рендерим карточки с фильмами
const filmsListMainElement = filmsListElement.querySelector(`.films-list__container`);
for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  render(filmsListMainElement, new FilmCardView(films[i]).getElement());
}

const [topRatedElement, mostCommentedElement] = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);
for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
  render(topRatedElement, new FilmCardView(filmsByRating[i]).getElement());
  render(mostCommentedElement, new FilmCardView(filmsByComments[i]).getElement());
}

// Рендерим футер
render(footerElement, new StatisticsView(films.length).getElement());

// Рендерим попап
render(footerElement, new FilmDetailsView(films[0]).getElement());
