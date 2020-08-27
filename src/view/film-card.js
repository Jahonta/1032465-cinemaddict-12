import {MAX_DESCRIPTION_LENGTH} from "../const.js";
import AbstractView from "./abstract.js";

const createFilmCardTemplate = (film, commentsCount) => {
  const {title, rating, release, runtime, genres, poster, description, inWatchlist, isWatched, isFavorite} = film;

  const shortenedDescription = description.length > MAX_DESCRIPTION_LENGTH ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}…` : description;

  const addActiveClass = (flag) => flag ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${release.getFullYear()}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${shortenedDescription}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${addActiveClass(inWatchlist)}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${addActiveClass(isWatched)}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${addActiveClass(isFavorite)}" type="button">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(film, commentsCount) {
    super();
    this._film = film;
    this._commentsCount = commentsCount;
    this._openPopupHandler = this._openPopupHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film, this._commentsCount);
  }

  _openPopupHandler(evt) {
    evt.preventDefault();
    this._callback.openPopup();
  }

  setOpenPopupHandler(callback) {
    this._callback.openPopup = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._openPopupHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._openPopupHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._openPopupHandler);
  }
}
