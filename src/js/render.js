import { cards } from './refs';
import { saveLs } from './storage';
import axios from 'axios';
import { IMG_BASE_URL, BASE_URL, IMG_W400, API_KEY } from './api-vars';

export async function getMovieGenres() {
  const { data } = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  return data;
}

export async function getGenres() {
  const genres = await getMovieGenres().then(({ genres }) => genres);

  return { genres };
}

export function renderMarkup(data) {
  getGenres().then(({ genres }) => {
    //Добавление списка жанров в localStorage
    saveLs('genresList', genres);
    if (data.results) {
      data.results.forEach(film => {
        const { genre_ids, release_date } = film;
        genres.forEach(({ name, id }) => {
          if (genre_ids.includes(id)) {
            if (genre_ids.length > 2) {
              genre_ids.splice(2, genre_ids.length - 1);
            }
            genre_ids.splice(genre_ids.indexOf(id), 1, name);
          }
          film.genre_names = genre_ids.join(', ');
          if (film.release_date) {
            film.release_date = release_date.slice(0, 4);
          }
        });
      });
    }
    const markupList = createListMarkup(data.results);
    if (cards) {
      cards.innerHTML = markupList;
    }
  });
}

import { addMovieToLibrary } from './my-library';

export function createListMarkup(data) {
  if (data) {
    return data
      .map(
        ({
          original_title,
          poster_path,
          vote_average,
          id,
          genre_names,
          release_date,
        }) => {
          let posterPath = ``;
          if (poster_path) {
            posterPath = `${IMG_BASE_URL}${IMG_W400}${poster_path}`;
          } else {
            posterPath = 'https://i.ibb.co/C0LFwTh/OIF.jpg';
          }
          return `<li class='cards-list__item' data-id='${id}'>
            <img
              class='cards-list__img'
              src='${posterPath}'
              alt='${original_title}'
              width
              loading='lazy'
              data-id='${id}'
            />
            <div class='cards-list__wrap'>
              <div class='cards-list__info'>
                <h2 class='cards-list__title'>${original_title}</h2>
                <p class='cards-list__text'>${genre_names} | ${release_date}</p>
              </div>
              <span class='cards-list__rate'>${vote_average.toFixed(1)}</span>
            </div>
            </li>
            `;
        }
      )
      .join('');
  }
}
