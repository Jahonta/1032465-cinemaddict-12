export const createProfileTemplate = (watchedFilms) => {
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
    default:
      rank = ``;
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
