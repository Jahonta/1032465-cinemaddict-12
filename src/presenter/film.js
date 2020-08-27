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

    this._escKeyDownHadler = this._escKeyDownHadler.bind(this);
    this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
    this._closePopupClickHandler = this._closePopupClickHandler.bind(this);
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

  _openPopup() {
    document.querySelector(`body`).classList.add(`hide-overflow`);
    append(this._filmsListContainer, this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._escKeyDownHadler);
  }

  _closePopup() {
    document.querySelector(`body`).classList.remove(`hide-overflow`);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHadler);
  }

  _escKeyDownHadler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
      document.removeEventListener(`keydown`, this._escKeyDownHadler);
    }
  }

  _openPopupClickHandler(evt) {
    evt.preventDefault();
    this._openPopup();
  }

  _closePopupClickHandler(evt) {
    evt.preventDefault();
    this._closePopup();
  }
}
