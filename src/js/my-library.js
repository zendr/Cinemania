// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.library-list');

const addMovieButton = document.getElementById('addMovie');
const showMovieButton = document.getElementById('showMovie');
const loadMoreButton = document.getElementById('loadMore');

const librariesKey = 'libraries';
let page = 1;
let perPage = 9;
showMovies(); // LOAD

addMovieButton.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * topTenFilms.length);
  const film = topTenFilms[randomIndex];
  film.id = Math.random();
  addMovieToLibrary(film);
});

showMovieButton.addEventListener('click', () => {
  showMovies();
});

loadMoreButton.addEventListener('click', () => {
  page += 1;
  showMovies();
});

function addMovieToLibrary(film) {
  let libraries = JSON.parse(localStorage.getItem(librariesKey));
  if (!libraries) {
    libraries = {};
  }
  libraries[film.id] = film;
  localStorage.setItem(librariesKey, JSON.stringify(libraries));
}

function removeMovieFromLibrary(film) {
  let libraries = JSON.parse(localStorage.getItem(librariesKey));
  delete libraries[film.id];
  localStorage.setItem(librariesKey, JSON.stringify(libraries));
}

function getMovieFromLibrary() {
  const libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
  return libraries[film.id];
}

function getMoviesFromLibrary() {
  const libraries = JSON.parse(localStorage.getItem(librariesKey)) || {};
  return Object.values(libraries);
}

export { getMovieFromLibrary, addMovieToLibrary, removeMovieFromLibrary };

function showMovies() {
  let markup = renderMovies();
  if (!markup) {
    markup = `<div class="library-empty"> <p class="library-empty__mistake">OOPS... <br> We are very sorry! <br> You don't have any movies at your library.</p>
    <button class="library-empty__btn">Search movie</button> </div>`;
  }
  if (gallery) {
    gallery.innerHTML = markup;
  }
}

function renderMovies() {
  const allMovies = getMoviesFromLibrary();

  if (!Object.keys(allMovies)) {
    return null;
  }

  const movies = allMovies.slice(0, page * perPage);
  const markup = movies
    // <img
    // class="library-item__img"
    // src="${url}"
    // alt="${name}"
    // loading="lazy"
    // />
    .map(({ id, name, genre, year, url, rate }) => {
      return `
                <div class="library-item" "> 
                  <img
                    class="library-item__img"
                    alt="${name}"
                    loading="lazy"
                  />
                  <div class="library-list">
                    <p class="library-list-item">
                      <b>Name</b>${name}
                    </p>
                    <p class="library-list-item">
                      <b>Rate</b>${rate}
                    </p>
                    <p class="library-list-item">
                      <b>Genre</b>${genre}
                    </p>
                    <p class="library-list-item">
                      <b>Year</b>${year}
                    </p>
                  </div>
                </div>
              </a>`;
    })
    .join('');

  loadMoreButton.style = 'display: none;';
  if (allMovies.length > page * perPage) {
    loadMoreButton.style = '';
  }
  return markup;
}

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionDelay: 250,
//   captions: true,
//   captionsData: 'alt',
// });

const topTenFilms = [
  {
    name: 'The Shawshank Redemption',
    genre: 'Drama',
    year: 1994,
    rate: 4.9,
    url: 'https://m.media-amazon.com/images/M/MV5BMDYwYTdkZGUtOWRiYS00OGYxLTkyZGUtZmEwMzk4MDYyMGM5XkEyXkFqcGdeQXVyMTQ2MjgxNTE4._V1_FMjpg_UY3000_.jpg',
  },
  {
    name: 'The Godfather',
    genre: 'Crime, Drama',
    year: 1972,
    rate: 4.8,
    url: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UY1982_.jpg',
  },
  {
    name: 'The Godfather: Part II',
    genre: 'Crime, Drama',
    year: 1974,
    rate: 4.7,
    url: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg',
  },
  {
    name: 'The Dark Knight',
    genre: 'Action, Crime, Drama',
    year: 2008,
    rate: 4.6,
    url: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg',
  },
  {
    name: '12 Angry Men',
    genre: 'Drama',
    year: 1957,
    rate: 4.5,
    url: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg',
  },
  {
    name: "Schindler's List",
    genre: 'Biography, Drama, History',
    year: 1993,
    rate: 4.4,
    url: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg',
  },
  {
    name: 'The Lord of the Rings: The Return of the King',
    genre: 'Action, Adventure, Drama',
    year: 2003,
    rate: 4.3,
    url: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg',
  },
  {
    name: 'Pulp Fiction',
    genre: 'Crime, Drama',
    year: 1994,
    rate: 4.2,
    url: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg',
  },
  {
    name: 'The Good, the Bad and the Ugly',
    genre: 'Western',
    year: 1966,
    rate: 4.1,
    url: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg',
  },
  {
    name: 'Fight Club',
    genre: 'Drama',
    year: 1999,
    rate: 4.0,
    url: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg',
  },
];
