export const createFilmCardTemplate = (film) => {
  const {title, rating, release, runtime, genres, poster, description, comments, inWatchlist, isWatched, isFavorite} = film;

  const shortenedDescription = description.length > 140 ? `${description.substr(0, 139)}…` : description;

  const addActiveClass = (flag) => flag ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${release.getFullYear()}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genres}</span>
      </p>
      <img src="${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${shortenedDescription}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${addActiveClass(inWatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${addActiveClass(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${addActiveClass(isFavorite)}">Mark as favorite</button>
      </form>
    </article>`
  );
};
