import FilmsListView from "../view/films-list.js";
import LoadMoreButtonView from "../view/load-more-button.js";
import NoFilmView from "../view/no-film.js";
import {render, remove} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import FilmPresenter from "./film.js";

const FILMS_COUNT_PER_STEP = 5;

export default class FilmsList {
  constructor(filmsListContainer) {
    this._filmsListContainer = filmsListContainer;
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._filmPresenter = {};

    this._filmsListComponent = new FilmsListView();
    this._filmsListElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    this._noFilmComponent = new NoFilmView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._renderFilmsList();
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
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
    const filmPresenter = new FilmPresenter(this._filmsListElement, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
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
    }
    render(this._filmsListContainer, this._filmsListComponent);
    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
    this._renderFilms(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));
  }
}
