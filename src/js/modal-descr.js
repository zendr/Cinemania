//імпортування бібліотек
import { IMG_BASE_URL, BASE_URL, IMG_W400, API_KEY } from './api-vars';
import { getMovieById2 } from './api-service';
import axios from 'axios';
import storage from './storage';
// import { createListMarkup } from './render';


//обява перемінних
const refs = {
    openModal: document.querySelector('.films'),
    closeModal: document.querySelector('.modal__close-btn'),
    Backdrop: document.querySelector('.backdrop'),
    ModalCont: document.querySelector('.modal__container'),
    cardsfilm: document.querySelector('.cards-film'),
    FilmBtn: document.querySelector('.film__button'),
};

//додавання слухачів
refs.openModal.addEventListener('click', openModalDescr);
refs.closeModal.addEventListener('click', closeModalDescr);
refs.FilmBtn.addEventListener('click', AddToLibrary);


//відкривання модального вікна
function openModalDescr(e) {
    // console.log(e.target.nodeName);
    // if (e.target.nodeName !== 'IMG') {
    // return;
    // }
    refs.Backdrop.classList.remove('is-hidden');
    refs.ModalCont.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onEscBtnPress);
  document.addEventListener('click', onBackdropClick);

    const filmID = e.target.dataset.id;
    createMarkup(filmID);


    const filmInLibrary = getMovieFromLibrary(filmID);
    if (filmInLibrary) { 
        // console.log(filmInLibrary);
    }
    // console.log('filmID = ' + filmID);

}


//Додавання розмітки по фільму
function createMarkup(filmID) {
    console.log('filmID =' + filmID);
    const film = getMovieById2(filmID);
     film.then(data => {console.log(data);});
    const filmMarkup = createFilmMarkup(film.results);
     console.log( 'StartfilmMarkup');
    console.log(filmMarkup);
     console.log( 'FinishfilmMarkup');
    //   refs.cardsfilm.innerHTML = markupfilm;
}



//створення розмітки по фільму
function createFilmMarkup(data) {
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
          return `<li class='cards-film' data-id='${id}'>
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

//додавання фільму у бібліотеку
function AddToLibrary() {
   console.log('in  AddToLibrary 1'); }


//Функція закриття по ESC
function onEscBtnPress(e) {
    console.log(e.code)
  if (e.code === 'Escape') {
    closeModalDescr();
  }
}

//Функція закриття модалки поза межами модалки
function onBackdropClick(e) {
    console.log(e.target);
    console.log(refs.Backdrop);
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

}
//Отримання данних по фільму
function getMovieFromLibrary(id) {
    console.log('getMovieFromLibrary');
    return "getMovieFromLibrary 11111";
}

function addMovieToLibrary(id) {
    console.log('addMovieToLibrary');
}
function removeMovieFromLibrary(id){
    console.log('removeMovieFromLibrary');
}