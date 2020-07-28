"use strict";

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

const header = document.querySelector(`.header`);
render(header, createProfileTemplate(), `beforeend`);
