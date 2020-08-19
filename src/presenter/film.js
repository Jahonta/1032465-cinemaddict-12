import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details.js";
import {render, remove, append} from "../utils/render.js";
import {generateComments} from "../mock/comment.js";

export default class Film {
  constructor(filmsListContainer) {
    this._filmsListContainer = filmsListContainer;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._comments = [];

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._openPopup = this._openPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
  }

  init(film) {
    this._film = film;
    this._comments = generateComments();
    this._filmCardComponent = new FilmCardView(this._film, this._comments.length);
    this._filmDetailsComponent = new FilmDetailsView(this._film, this._comments);

    this._filmCardComponent.setClickHandler(() => {
      this._openPopup();
    });
    this._filmDetailsComponent.setClickHandler(() => {
      this._closePopup();
    });

    render(this._filmsListContainer, this._filmCardComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailsComponent);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _openPopup() {
    append(this._filmsListContainer, this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _closePopup() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
