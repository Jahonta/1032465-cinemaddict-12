"use strict";

const FILM_COUNT = 5;
const FILM_COUNT_EXTRA = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
    `
  );
};

const createNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

const createFilmsTemplate = () => {
  return (
    `<section class="films">
    </section>`
  );
};

const createFilmsListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
      </div>

    </section>`
  );
};

const createLoadMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const createFilmsListExtraTemplate = (heading) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${heading}</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

const createFilmCardTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Dance of Life</h3>
      <p class="film-card__rating">8.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1929</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

const createStatisticsTemplate = () => {
  return (
    `<section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>`
  );
}

// Рендерим шапку
const header = document.querySelector(`.header`);
render(header, createProfileTemplate(), `beforeend`);

// Рендерим мейн
const main = document.querySelector(`.main`);
render(main, createNavigationTemplate(), `beforeend`);
render(main, createSortTemplate(), `beforeend`);
render(main, createFilmsTemplate(), `beforeend`);

// Рендерим список фильмов
const films = main.querySelector(`.films`);
render(films, createFilmsListTemplate(), `beforeend`);

const filmsList = main.querySelector(`.films-list`);
render(filmsList, createLoadMoreTemplate(), `beforeend`);

render(films, createFilmsListExtraTemplate(`Top rated`), `beforeend`);
render(films, createFilmsListExtraTemplate(`Most commented`), `beforeend`);

// Рендерим карточки с фильмами
const filmsListMain = filmsList.querySelector(`.films-list__container`);
for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsListMain, createFilmCardTemplate(), `beforeend`);
}

const filmsListExtras = films.querySelectorAll(`.films-list--extra`);
for (let filmsListExtra of filmsListExtras) {
  const container = filmsListExtra.querySelector(`.films-list__container`);
  for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
    render(container, createFilmCardTemplate(), `beforeend`);
  }
}

// Рендерим футер
const footer = document.querySelector(`.footer`);
render(footer, createStatisticsTemplate(), `beforeend`);
