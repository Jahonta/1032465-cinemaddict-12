import FilmsListView from "../view/films-list.js";
import LoadMoreButtonView from "../view/load-more-button.js";
import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details.js";
import NoFilmView from "../view/no-film.js";
import {render, remove, append} from "../utils/render.js";
import {generateComments} from "../mock/comment.js";

const FILMS_COUNT_PER_STEP = 5;

export default class FilmsList {
  constructor(filmsListContainer) {
    this._filmsListContainer = filmsListContainer;
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;

    this._filmsListComponent = new FilmsListView();
    this._filmsListElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    this._noFilmComponent = new NoFilmView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(films) {
    this._films = [...films];
    this._renderFilmsList();
  }

  _handleLoadMoreButtonClick() {
    this._renderFilms(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmsCount += FILMS_COUNT_PER_STEP;
    if (this._renderedFilmsCount >= this._films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._filmsListComponent, this._loadMoreButtonComponent);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderFilm(film) {
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
      append(this._filmsListContainer, filmDetailsComponent);
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

    render(this._filmsListElement, filmCardComponent);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderNoFilm() {
    render(this._filmsListComponent, this._noFilmComponent);
  }

  _renderFilmsList() {
    if (this._films.length === 0) {
      this._renderNoFilm();
      return;
    } else {
      render(this._filmsListContainer, this._filmsListComponent);
      if (this._films.length > FILMS_COUNT_PER_STEP) {
        this._renderLoadMoreButton();
      }
      this._renderFilms(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));
    }
  }
}
