import Notiflix from 'notiflix';
import axios from 'axios';
import { API_KEY, BASE_URL, TREND_URL, SEARCH_URL, ID_URL, IMG_BASE_URL, IMG_W400 } from './api-vars';

const UPCOMING_URL = `${BASE_URL}/movie/upcoming`;

const upcomingBlock = document.querySelector('.container__upcoming');

// FETCH FOR UPCOMIG MOVIES 
    
    function fetchUpcomingMovies() {
 https://developers.themoviedb.org/3/movies/get-upcoming

    return fetch(`${UPCOMING_URL}?api_key=${API_KEY}&language=en-US&page=1`)
    . then(movieData => {

        if  (! movieData. ok) {
            throw  new  Error(movieData. status)
          }
        return  movieData. json()
       
      })
}

async function getFetchedMovies() {
  try {
    const data = await fetchUpcomingMovies();
    const  returnedResult  =  data. results;
     console.log(returnedResult);

    if  (returnedResult. length  >=  1) {
        const randomMovie = returnedResult[Math.floor(Math.random() * returnedResult.length)];
        const  genreNames  =  await  getGenresById(randomMovie. genre_ids);
      const  createdMarkup  =  await  renderMarkup({ ... randomMovie, genreNames });
      upcomingBlock. insertAdjacentHTML('beforeend',  createdMarkup);
    }
  } catch (error) {
    console. log(error);
  }
}
getFetchedMovies()

async function renderMarkup({ poster_path, backdrop_path, title, overview, popularity, vote_average, vote_count, release_date, genre_ids}) {
  const genreNames = await getGenresById(genre_ids);

  return `
    <div class="container container__upcoming">
 <div class="upcoming__card">
 <h2 class="upcoming__title">UPCOMING THIS MONTH</h2>
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
                        <p class="upcoming__text">Release date <span class="upcoming__info--release--date">${release_date}</span></p>
                    </div>
                    <div class="upcoming__info--vote">
                        <p class="upcoming__text">Vote/Votes
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
                        <p class="upcoming__text"> Popularity <span class="upcoming__info--pop--range">${popularity}</span> </p>
                    </div>
                    <div class="upcoming__info--genre">
                        <p class="upcoming__text"> Genre <span class="upcoming__info--genre--kind">${genreNames}</span> </p>
                    </div>
                </div>
            </div>
            <h2 class="upcoming__info--about">ABOUT</h2>

            <p class="upcoming__info--description">${overview}</p>
            <button class="upcoming__remindme--btn" type="button">Remind me</button>
        </div>

    </div>
     `;
}

async function getGenresById(genreIds) {
  const API_KEY = '249f222afb1002186f4d88b2b5418b55';
  const BASE_URL = `https://api.themoviedb.org/3/genre/movie/list`;

  const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();

  const genreNames = genreIds.map((genreId) => {
    const genre = data.genres.find((genre) => genre.id === genreId);
    return genre.name;
  });

  return genreNames.join(', ');
}


