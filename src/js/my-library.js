import { createListMarkup } from './render';
import { getMovieById2 } from './api-service';

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

export function addMovieToLibrary(movieId) {
  getMovieById2(movieId).then(movie => {
    movie.genre_names = movie.genres
      .map(genre => {
        return genre.name;
      })
      .slice(0, 2)
      .join(',');
    let libraries = JSON.parse(localStorage.getItem(librariesKey));
    if (!libraries) {
      libraries = {};
    }
    libraries[movie.id] = movie;
    localStorage.setItem(librariesKey, JSON.stringify(libraries));
  });
}

export function removeMovieFromLibrary(movieId) {
  let libraries = JSON.parse(localStorage.getItem(librariesKey));
  delete libraries[movieId];
  localStorage.setItem(librariesKey, JSON.stringify(libraries));
}

export function getMovieFromLibrary(movieId) {
  const libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
  return libraries[movieId];
}

function getMoviesFromLibrary() {
  const libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
  return Object.values(libraries);
}

export function renderLibraryData() {
  let movieMarkup = renderMovies();
  if (!movieMarkup) {
    movieMarkup = `
    <div class="container">
      <p class="library-empty__mistake">OOPS... <br> We are very sorry! <br> You don't have any movies at your library.</p>
      <button class="library-empty__btn">Search movie </button>
    </div>
      `;
  } else {
    movieMarkup = `<div class="cards__list">${movieMarkup}</div>`;
  }
  refs.libraryList.innerHTML = movieMarkup;
}

function renderMovies() {
  const allMovies = getMoviesFromLibrary();

  if (!Object.keys(allMovies)) {
    return null;
  }

  let movies = allMovies.slice(0, page * perPage);

  const markup = createListMarkup(movies);

  refs.loadMoreButton.style = 'display: none;';
  if (allMovies.length > page * perPage) {
    refs.loadMoreButton.style = '';
  }
  return markup;
}
