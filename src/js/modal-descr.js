//імпортування бібліотек
import { IMG_BASE_URL, BASE_URL, IMG_W400, API_KEY } from './api-vars';
import { getMovieById2 } from './api-service';
import axios from 'axios';
import { addMovieToLibrary, removeMovieFromLibrary, getMovieFromLibrary } from './my-library';
// import { createListMarkup } from './render';

let posterPath = '';
let genresList = [];
let filmMarkup = '';
let filmsId = '';
// 

//обява перемінних
const refs = {
  openModal: document.querySelector('.films'),
  closeModal: document.querySelector('.modal__close-btn'),
  Backdrop: document.querySelector('.backdrop'),
  ModalCont: document.querySelector('.modal__container'),
  cardsfilm: document.querySelector('.cards-film'),
};

//додавання слухачів
refs.openModal.addEventListener('click', openModalDescr);
refs.closeModal.addEventListener('click', closeModalDescr);
// refs.FilmBtn.addEventListener('click', btn);
// function btn() {
//   console.log("btn", btn);
// }


//відкривання модального вікна
function openModalDescr(e) {
  refs.Backdrop.classList.remove('is-hidden');
  refs.ModalCont.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onEscBtnPress);
  document.addEventListener('click', onBackdropClick);
  const filmID = e.target.dataset.id;
  filmsId = filmID;
  console.log("filmID", filmID)
  createMarkup(filmID);
  changeBtnLibrary(filmID);
}

function AddFilmToLibrary() {
  const filmsId2 = refs.FilmBtn.dataset.id;
  if (getMovieFromLibrary(filmsId2)) {
    removeMovieFromLibrary(filmsId2);
    refs.FilmBtn.innerHTML = "Add to Library";
  } else {
    addMovieToLibrary(filmsId2);
    refs.FilmBtn.innerHTML = "Remove from Library";
  }
}

//Перевірка фільма у локольному сховищу та обробка  кнопки
function changeBtnLibrary(filmsId) {
  refs.FilmBtn.dataset.id = `${filmsId}`;
  if (getMovieFromLibrary(filmsId)) {
    refs.FilmBtn.innerHTML = "Remove from Library";
  } else {
    refs.FilmBtn.innerHTML = "Add to Library";
  }
}


//Додавання розмітки по фільму
async function createMarkup(filmID) {
  const film = getMovieById2(filmID);
  genresList = [];
  return film.then(data => {
    console.log(data.genres);
    const genres = data.genres;

    genres.forEach(genre => {
      genresList.push(` ${genre.name}`);
    });
    filmMarkup = createFilmMarkup(data);
    refs.cardsfilm.innerHTML = filmMarkup;
    const filmBtn = document.querySelector('.film__button');
    filmBtn.addEventListener('click', AddFilmToLibrary);
    
  })

};

//Функція закриття по ESC
function onEscBtnPress(e) {
  // console.log(e.code)
  if (e.code === 'Escape') {
    closeModalDescr();
  }
}

//Функція закриття модалки поза межами модалки
function onBackdropClick(e) {
  // console.log(e.target);
  // console.log(refs.Backdrop);
  if (e.target === refs.Backdrop) {
    closeModalDescr();
  }
}

//закривання модального вікна
function closeModalDescr(e) {
  refs.Backdrop.classList.add('is-hidden');
  refs.ModalCont.classList.add('is-hidden');
  document.body.style.overflow = 'scroll';
  document.removeEventListener('keydown', onEscBtnPress);
  document.removeEventListener('click', onBackdropClick);
  document.removeEventListener('click', AddFilmToLibrary);
}






function createFilmMarkup(data) {

  if (data) {
    const { original_title, id, genre_names, release_date, vote_average, poster_path, overview, popularity, vote_count } = data;

    if (poster_path) {
      posterPath = `${IMG_BASE_URL}${IMG_W400}${poster_path}`;
    } else {
      posterPath = 'https://i.ibb.co/C0LFwTh/OIF.jpg';
    }


    return `<li class='film-list' data-id='${id}'>
          <ul class='film-list__list'>
          <li class='film-list__img'>
            <img
              src='${posterPath}'
              alt='${original_title}'
              width
              loading='lazy'
            />
            </li>
            <li class='film-list__info'>            
                <h2 class='film-list__title'>${original_title}</h2>
                <div class="film-list__char">
                  <div class="film-list__title_text">
                    <p>Vote / Votes</p>
                    <p>Popularity</p>
                    <p class='film-list__title_text'>Genre</p>
                  </div>
                  <div  class="film-list__title_char">
                    <p class='film-list__text_average'><span  class='film-list__average'>${vote_average}</span>  /  <span  class='film-list__average'>${vote_count}</span></p>
                    <p class='film-list__text'>${popularity}</p>
                    <p class='film-list__text'>${genresList}</p>
                  </div>
                </div>
                <div class='film-list__about'>
                <p class='film-list__title_text-about'>ABOUT</p>
                <p class='film-list__text-about'>${overview}</p>
                 </div>
                 <div class="film__button-border">
                 <button type="button" class="film__button">Add to my library</button>
             </div>
            </li>
          </ul>
      </li>`;
    // return `<li class='film-list' data-id='${id}'>
    //       <ul class='film-list__list'>
    //       <li class='film-list__img'>
    //         <img
    //           src='${posterPath}'
    //           alt='${original_title}'
    //           width
    //           loading='lazy'
    //         />
    //         </li>
    //         <li class='film-list__info'>            
    //             <h2 class='film-list__title'>${original_title}</h2>
    //             <div>
    //             <p class='film-list__title_text'>Vote / Votes</p>
    //             <p class='film-list__text_average'><span  class='film-list__average'>${vote_average}</span>  /  <span  class='film-list__average'>${vote_count}</span></p>
    //             </div>
    //             <div>
    //             <p class='film-list__title_text'>Popularity</p>
    //             <p class='film-list__text'>${popularity}</p>
    //             </div>
    //             <div>
    //             <p class='film-list__title_text'>Genre</p>
    //             <p class='film-list__text'>${genresList}</p>
    //             </div>
    //             <div class='film-list__about'>
    //             <p class='film-list__title_text-about'>ABOUT</p>
    //             <p class='film-list__text-about'>${overview}</p>
    //              </div>
    //           </li>
    //         </div>
    //         </ul>
    //         </li>`;
  }
}