export const createProfileTemplate = (history) => {
  let status = ``;
  if (history >= 1 && history <= 10) {
    status = `novice`;
  } else if (history >= 11 && history <= 20) {
    status = `fan`;
  } else if (history >= 21) {
    status = `movie buff`;
  }
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${status}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
    `
  );
};
