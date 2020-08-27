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

    this._filmCardComponent.setOpenPopupHandler(() => {
      this._openPopup();
    });
    this._filmDetailsComponent.setClosePopupHandler(() => {
      this._closePopup();
    });

    render(this._filmsListContainer, this._filmCardComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
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
    document.querySelector(`body`).classList.add(`hide-overflow`);
    append(this._filmsListContainer, this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _closePopup() {
    document.querySelector(`body`).classList.remove(`hide-overflow`);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
