import {createElement} from "../utils.js";

const createProfileTemplate = (watchedFilms) => {
  let rank = ``;
  switch (true) {
    case watchedFilms >= 1 && watchedFilms <= 10:
      rank = `novice`;
      break;
    case watchedFilms >= 11 && watchedFilms <= 20:
      rank = `fan`;
      break;
    case watchedFilms >= 21:
      rank = `movie buff`;
      break;
  }

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
    `
  );
};

export default class Profile {
  constructor(watchedFilms) {
    this._element = null;
    this._watchedFilms = watchedFilms;
  }

  getTemplate() {
    return createProfileTemplate(this._watchedFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
