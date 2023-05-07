//імпортування бібліотек
import { IMG_BASE_URL, BASE_URL, IMG_W400, API_KEY } from './api-vars';
import { getMovieById2 } from './api-service';
import axios from 'axios';
import { addMovieToLibrary, removeMovieFromLibrary, getMovieFromLibrary } from './my-library';
// import { createListMarkup } from './render';

let posterPath = '';
let genresList = [];
let filmMarkup = '';

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
}


//Додавання розмітки по фільму
function createMarkup(filmID) {
    const film = getMovieById2(filmID);
   film.then(data => {console.log(data);});

  return film.then(data => {

    const genres = data.genres;
    genres.forEach(genre => {
      genresList.push(genre.name);
    });
      filmMarkup = createFilmMarkup(data);
    refs.cardsfilm.innerHTML = filmMarkup;
    // console.log(filmMarkup);
  })

};



//Додавання розмітки по фільму
// function createMarkup2(filmID) {
//     console.log('filmID =' + filmID);
//     const film = getMovieById2(filmID);
//  film.then(data => {console.log(data.original_title);});
//     // const film2 = film
//     //     .then(data => data)
//     //     .then(data => createFilmMarkup(data));
//     //     console.log("film2", film2)

//     // const filmMarkup = createFilmMarkup(film.results);
// // const filmMarkup = `<li class='cards-film' data-id='${id}'>`
// //     console.log("id", id);
// //     console.log("id2", id2);
// // console.log("filmMarkup", filmMarkup)

//      console.log( 'StartfilmMarkup');
//     // console.log(filmMarkup);
//      console.log( 'FinishfilmMarkup');
//     //   refs.cardsfilm.innerHTML = markupfilm;

//           film.then(data => {console.log(data);});
//     film.then(data => { console.log(data.id); });
//     if (1 === 1) {
//         addMovieToLibrary(447365);
//           addMovieToLibrary(758323);
//     }
//         if (1 === 0) {
//         removeMovieFromLibrary(447365);
//     }
//     const filmInLibrary = getMovieFromLibrary(filmID);
//     if (filmInLibrary) { 
//         // console.log(filmInLibrary);
//     }
// }






//додавання фільму у бібліотеку
function AddToLibrary() {
   console.log('in  AddToLibrary 1'); }


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
                <div>
                <p class='film-list__text'>Vote / Votes</p>
                <p class='film-list__text'>${vote_average} / ${vote_count}</p>
                </div>
                <div>
                <p class='film-list__text'>Popularity</p>
                <p class='film-list__text'>${popularity}</p>
                </div>
                <div>
                <p class='film-list__text'>Genre</p>
                <p class='film-list__text'>${genresList}</p>
                </div>
                <p class='film-list__text'>ABOUT</p>
                <p class='film-list__text'>${overview}</p>
              </li>
                   <li class="film-list_btn">
        <button type="button" class="film__button btn__watch btn__watch__remove">Add to my library</button>
        </li>             
            </div>
            </ul>
            </li>`;     
  }
}