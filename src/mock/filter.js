export const generateFilter = (films) => {
  return {
    watchlist: films.filter((film) => film.inWatchlist).length,
    history: films.filter((film) => film.isWatched).length,
    favorites: films.filter((film) => film.isFavorite).length
  };
};
