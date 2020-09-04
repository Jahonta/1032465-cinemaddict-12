import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details.js";
import {render, remove, append, replace} from "../utils/render.js";
import {generateComments} from "../mock/comment.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  OPENED: `OPENED`
};
export default class Film {
  constructor(filmsListContainer, changeData, changeMode) {
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._comments = [];
    this._mode = Mode.DEFAULT;

    this._escKeyDownHadler = this._escKeyDownHadler.bind(this);
    this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
    this._closePopupClickHandler = this._closePopupClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._comments = generateComments();
    this._filmCardComponent = new FilmCardView(this._film, this._comments.length);
    this._filmDetailsComponent = new FilmDetailsView(this._film, this._comments);

    this._filmCardComponent.setOpenPopupHandler(() => {
      this._openPopup();
    });
    this._filmCardComponent.setWatchlistHandler(() => {
      this._watchlistClickHandler();
    });
    this._filmCardComponent.setWatchedHandler(() => {
      this._watchedClickHandler();
    });
    this._filmCardComponent.setFavoriteHandler(() => {
      this._favoriteClickHandler();
    });
    this._filmDetailsComponent.setClosePopupHandler(() => {
      this._closePopup();
    });
    this._filmDetailsComponent.setWatchlistHandler(() => {
      this._watchlistClickHandler();
    });
    this._filmDetailsComponent.setWatchedHandler(() => {
      this._watchedClickHandler();
    });
    this._filmDetailsComponent.setFavoriteHandler(() => {
      this._favoriteClickHandler();
    });

    if (prevFilmDetailsComponent === null && prevFilmCardComponent === null) {
      render(this._filmsListContainer, this._filmCardComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(prevFilmCardComponent, this._filmCardComponent);
    }

    if (this._mode === Mode.OPENED) {
      replace(prevFilmDetailsComponent, this._filmDetailsComponent);
    }

    remove(prevFilmDetailsComponent);
    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _openPopup() {
    document.querySelector(`body`).classList.add(`hide-overflow`);
    append(this._filmsListContainer, this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._escKeyDownHadler);
    this._changeMode();
    this._mode = Mode.OPENED;
  }

  _watchlistClickHandler() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              inWatchlist: !this._film.inWatchlist
            }
        )
    );
  }

  _watchedClickHandler() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _favoriteClickHandler() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _closePopup() {
    document.querySelector(`body`).classList.remove(`hide-overflow`);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHadler);
    this._mode = Mode.DEFAULT;
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
