import Notiflix from 'notiflix';  
import axios from 'axios';
import {
  API_KEY,
  BASE_URL,
  TREND_URL,
  SEARCH_URL,
  ID_URL,
  IMG_BASE_URL,
  IMG_W400,
} from './api-vars';
import { addMovieToLibrary, removeMovieFromLibrary, getMovieFromLibrary} from './my-library';

const UPCOMING_URL = `${BASE_URL}/movie/upcoming`;

const upcomingBlock = document.querySelector('.container__upcoming');

let randomMovie;
let movieId;
let remindBtn;


// FETCH FOR UPCOMIG MOVIES

async function fetchUpcomingMovies() {
  return fetch(
    `${UPCOMING_URL}?api_key=${API_KEY}&language=en-US&page=1`
  ).then(movieData => {
    if (!movieData.ok) {
      Notiflix.Notify.failure(`Sorry, there are no upcoming films for today`);
      throw new Error(movieData.status);
    }
    return movieData.json();
  });
}

function onClickRemind(event) {
  movieId = event.target.dataset.movieid;
  AddFilmToLibrary(movieId);
  let titleMovie = randomMovie.title;
  if (remindBtn.textContent !== 'Remove from Library') {
    Notiflix.Notify.success(`"${titleMovie}" removed from the library`);
    return;
  }
  Notiflix.Notify.success(`"${titleMovie}" added to the library`);
}

function AddFilmToLibrary(movieId) {
  if (getMovieFromLibrary(movieId)) {
    removeMovieFromLibrary(movieId);
    remindBtn.textContent = "Remind me";
  } else {
    addMovieToLibrary(movieId);
    remindBtn.textContent = "Remove from Library";
  }
}

//Перевірка фільма у локольному сховищу та обробка  кнопки
function changeBtnLibrary(movieId, remindBtn) {
  if (getMovieFromLibrary(movieId)) {
    remindBtn.textContent = "Remove from Library";
  } else {
    remindBtn.textContent = "Remind me";
  }
}

async function getFetchedMovies() {
  try {
    const data = await fetchUpcomingMovies();
    const returnedResult = data.results;

    if (returnedResult.length >= 1) {
      randomMovie =
        returnedResult[Math.floor(Math.random() * returnedResult.length)];
      const genreNames = await getGenresById(randomMovie.genre_ids);
      const createdMarkup = await renderMarkup({ ...randomMovie, genreNames });
      upcomingBlock.insertAdjacentHTML('beforeend', createdMarkup);
      remindBtn = document.querySelector('.upcoming__remindme--btn');
      changeBtnLibrary(movieId, remindBtn);
      remindBtn.addEventListener('click', onClickRemind);
    }
  } catch (error) {
    console.log(error);
  }
}
getFetchedMovies();

async function renderMarkup({
  id,
  poster_path,
  backdrop_path,
  title,
  overview,
  popularity,
  vote_average,
  vote_count,
  release_date,
  genre_ids,
}) {
  const genreNames = await getGenresById(genre_ids);

  return `
    
 <div class="upcoming__card">
 <div class="upcoming__thumb">
      
      <picture class='.upcoming__poster'>
      <source srcset="https://image.tmdb.org/t/p/original/${backdrop_path}" media="(min-width: 1200px)" class='upcoming__poster-desktop' />
      <source srcset="https://image.tmdb.org/t/p/original/${backdrop_path}" media="(min-width: 768px)" class='upcoming__poster-tablet' />
      <source srcset="https://image.tmdb.org/t/p/original/${poster_path}" media="(min-width: 320px)" />
      <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="Movie Poster" style='width: 805px'/>
    </picture>
      </div>
      </div>

<div class="upcoming__info">
            <h2 class="upcoming__info--title">${title}</h2>
            <div class="upcoming__movie">
                <div class="upcoming__info--left">
                    <div class="upcoming__info--release">
                        <p class="upcoming__text"> <span class ="upcoming__light--black">Release date</span> <span class="upcoming__info--release--date">${release_date}</span></p>
                    </div>
                    <div class="upcoming__info--vote">
                        <p class="upcoming__text"><span class ="upcoming__light--black">Vote/Votes</span>
                        <div class="upcoming__info--votes"><span class="upcoming__info--white">${vote_average}</span> <span
                                class="slash">/</span>
                            <span class="upcoming__info--white">
                               ${vote_count}</span>
                        </div>
                        </p>
                    </div>
                </div>
                <div class="upcoming__info--right">
                    <div class="upcoming__info--pop">
                        <p class="upcoming__text"> <span class ="upcoming__light--black">Popularity</span> <span class="upcoming__info--pop--range">${popularity}</span> </p>
                    </div>
                    <div class="upcoming__info--genre">
                        <p class="upcoming__text"><span class ="upcoming__light--black">Genre</span> <span class="upcoming__info--genre--kind">${genreNames}</span> </p>
                    </div>
                </div>
            </div>
            <h2 class="upcoming__info--about">ABOUT</h2>

            <p class="upcoming__info--description">${overview}</p>
            <button class="upcoming__remindme--btn" data-movieid=${id}  type="button">Remind me</button>
        </div>

   
     `;
}

async function getGenresById(genreIds) {
  const API_KEY = '249f222afb1002186f4d88b2b5418b55';
  const BASE_URL = `https://api.themoviedb.org/3/genre/movie/list`;

  const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();

  const genreNames = genreIds.map(genreId => {
    const genre = data.genres.find(genre => genre.id === genreId);
    return genre.name;
  });

  return genreNames.join(', ');
}

