import { createListMarkup } from './render';

const librariesKey = 'libraries';
let page = 1;
let perPage = 9;

const refs = {
  libraryList: document.querySelector('.library-list'),
  loadMoreButton: document.getElementById('loadMore'),
};

if (refs.libraryList) renderLibraryData();
if (refs.loadMoreButton) {
  refs.loadMoreButton.addEventListener('click', () => {
    page += 1;
    renderLibraryData();
  });
}

export function addMovieToLibrary(film) {
  let libraries = JSON.parse(localStorage.getItem(librariesKey));
  if (!libraries) {
    libraries = {};
  }
  libraries[film.id] = film;
  localStorage.setItem(librariesKey, JSON.stringify(libraries));
}

export function removeMovieFromLibrary(filmId) {
  let libraries = JSON.parse(localStorage.getItem(librariesKey));
  delete libraries[filmId];
  localStorage.setItem(librariesKey, JSON.stringify(libraries));
}

export function getMovieFromLibrary(filmId) {
  const libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
  return libraries[filmId];
}

function getMoviesFromLibrary() {
  const libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
  return Object.values(libraries);
}

export function renderLibraryData() {
  let movieMarkup = renderMovies();
  if (!movieMarkup) {
    movieMarkup = `<p class="library-empty__mistake">OOPS... <br> We are very sorry! <br> You don't have any movies at your library.</p>
    <button class="library-empty__btn">Search movie </button>`;
  }
  refs.libraryList.innerHTML = movieMarkup;
}

function renderMovies() {
  const allMovies = getMoviesFromLibrary();

  if (!Object.keys(allMovies)) {
    return null;
  }

  let movies = allMovies.slice(0, page * perPage);
  movies.map(movie => {
    movie.genre_names = movie.genre_ids.join(', ');
    return movie;
  });
  const markup = createListMarkup(movies);

  refs.loadMoreButton.style = 'display: none;';
  if (allMovies.length > page * perPage) {
    refs.loadMoreButton.style = '';
  }
  return markup;
}
