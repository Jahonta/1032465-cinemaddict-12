import {render} from "./utils/render.js";
import ProfileView from "./view/profile.js";
import NavigationView from "./view/navigation.js";
import SortView from "./view/sort.js";
import FilmsView from "./view/films.js";
import StatisticsView from "./view/statistics.js";
import FilmsListPresenter from "./presenter/films-list.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
// import TopRatedFilmsView from "./view/top-rated-films.js";
// import MostCommentedFilmsView from "./view/most-commented-films.js";

const FILMS_COUNT = 20;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

render(headerElement, new ProfileView(filters.history));
render(mainElement, new NavigationView(filters));
render(mainElement, new SortView());
render(mainElement, new FilmsView());

const filmsElement = mainElement.querySelector(`.films`);
const filmsListPresenter = new FilmsListPresenter(filmsElement);
filmsListPresenter.init(films);

// const FILMS_EXTRA_COUNT = 2;
// render(filmsElement, new TopRatedFilmsView());
// render(filmsElement, new MostCommentedFilmsView());
// const [topRatedElement, mostCommentedElement] = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);
// for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
//   renderFilm(topRatedElement, films[i]);
//   renderFilm(mostCommentedElement, films[i]);
// }

render(footerElement, new StatisticsView(films.length));
