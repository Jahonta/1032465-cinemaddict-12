import {render, remove, append} from "./utils/render.js";
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
import NoFilmView from "./view/no-film.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateComments} from "./mock/comment.js";

const FILMS_COUNT = 20;
const FILMS_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const bodyElement = document.querySelector(`body`);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const renderFilm = (filmListElement, film) => {
  const comments = generateComments();
  const filmCardComponent = new FilmCardView(film, comments.length);
  const filmDetailsComponent = new FilmDetailsView(film, comments);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const openPopup = () => {
    append(bodyElement, filmDetailsComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const closePopup = () => {
    remove(filmDetailsComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };


  filmCardComponent.setClickHandler(() => {
    openPopup();
  });
  filmDetailsComponent.setClickHandler(() => {
    closePopup();
  });

  render(filmListElement, filmCardComponent);
};


// Рендерим шапку
render(headerElement, new ProfileView(filters.history));

// Рендерим мейн
render(mainElement, new NavigationView(filters));
render(mainElement, new SortView());
render(mainElement, new FilmsView());

// Рендерим списки фильмов
const filmsElement = mainElement.querySelector(`.films`);
render(filmsElement, new FilmsListView());

const filmsListElement = mainElement.querySelector(`.films-list`);
if (films.length === 0) {
  render(filmsListElement, new NoFilmView());
} else {
  if (films.length > FILMS_COUNT_PER_STEP) {
    const loadMoreButtonComponent = new LoadMoreButtonView();
    render(filmsListElement, loadMoreButtonComponent);

    let renderedFilmsCount = FILMS_COUNT_PER_STEP;
    loadMoreButtonComponent.setClickHandler(() => {
      films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmsListMainElement, film));
      renderedFilmsCount += FILMS_COUNT_PER_STEP;
      if (renderedFilmsCount >= films.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }

  render(filmsElement, new TopRatedFilmsView());
  render(filmsElement, new MostCommentedFilmsView());

  // Рендерим карточки с фильмами
  const filmsListMainElement = filmsListElement.querySelector(`.films-list__container`);
  for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
    renderFilm(filmsListMainElement, films[i]);
  }

  const [topRatedElement, mostCommentedElement] = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    renderFilm(topRatedElement, films[i]);
    renderFilm(mostCommentedElement, films[i]);
  }

}
// Рендерим футер
render(footerElement, new StatisticsView(films.length));
