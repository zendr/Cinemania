//імпортування бібліотек
import { IMG_BASE_URL, BASE_URL, IMG_W400, API_KEY } from './api-vars';
import { getMovieById2 } from './api-service';
import axios from 'axios';
import { addMovieToLibrary, removeMovieFromLibrary, getMovieFromLibrary, renderLibraryData } from './my-library';

let posterPath = '';
let genresList = [];
let filmMarkup = '';
let filmsId = '';
let filmBtn;
let selectedMovieId;

//обява перемінних
const refs = {
  openModal: document.querySelector('.films'),
  closeModal: document.querySelector('.modal__close-btn'),
  Backdrop: document.querySelector('.backdrop'),
  ModalCont: document.querySelector('.modal__container'),
  cardsfilm: document.querySelector('.cards-film'),
  FilmBtn: document.querySelector('.film__button'),
  libraryList: document.querySelector('.library-list'),
  cardList: document.querySelector('.films'),
};

// cardList: document.getElementById('cards__list'),


if(refs.cardList){
  refs.cardList.addEventListener('click', createModal);
}

function createModal(event) {
  const selectedMovie = event.target.closest('li');
  selectedMovieId = Number(selectedMovie.getAttribute('data-id'));
  refs.closeModal.addEventListener('click', closeModalDescr);

    createMarkup(selectedMovieId);

    openModalDescr();
}

//відкривання модального вікна
function openModalDescr(e) {
  refs.Backdrop.classList.remove('is-hidden');
  refs.ModalCont.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onEscBtnPress);
  document.addEventListener('click', onBackdropClick);
}

function AddFilmToLibrary() {
  const filmsId2 = filmBtn.dataset.id;
  if (getMovieFromLibrary(selectedMovieId)) {
    removeMovieFromLibrary(selectedMovieId);
    filmBtn.innerHTML = "Add to Library";
  } else {
    addMovieToLibrary(selectedMovieId);
    filmBtn.innerHTML = "Remove from Library";
  }
}

//Перевірка фільма у локольному сховищу та обробка  кнопки
function changeBtnLibrary(filmsId, filmBtn) {
  // refs.FilmBtn.dataset.id = `${filmsId}`;
  if (getMovieFromLibrary(filmsId)) {
    filmBtn.innerHTML = "Remove from Library";
  } else {
    filmBtn.innerHTML = "Add to Library";
  }
}

//Додавання розмітки по фільму
async function createMarkup(filmID) {
  const film = getMovieById2(filmID);
  genresList = [];
  refs.cardsfilm.innerHTML = '';
  film.then(data => {
    // console.log(data.genres);
    const genres = data.genres;

    genres.forEach(genre => {
      genresList.push(` ${genre.name}`);
    });
    filmMarkup = createFilmMarkup(data);
    refs.cardsfilm.innerHTML = filmMarkup;
    // Зберігаємо посилання на кнопку в змінну filmBtn
    filmBtn = document.querySelector('.film__button');
    filmBtn.addEventListener('click', AddFilmToLibrary);  
    // Виклик функції changeBtnLibrary
    changeBtnLibrary(selectedMovieId, filmBtn);


    // Додаємо слухача подій до кнопки
})
};

//Функція закриття по ESC
function onEscBtnPress(e) {
  if (e.code === 'Escape') {
    closeModalDescr();
  }
}

//Функція закриття модалки поза межами модалки
function onBackdropClick(e) {
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
  if (refs.libraryList) {
    renderLibraryData();
    refs.cardList = document.querySelector('.films');
    if (refs.cardList) refs.cardList.addEventListener('click', createModal)
  }  
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
  }
}