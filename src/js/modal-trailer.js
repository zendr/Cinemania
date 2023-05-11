import { API_KEY, BASE_URL, ID_URL } from './api-vars';
import { renderHeroRandomFilm } from './header';
import axios from 'axios';
import { getMovieById3 } from './api-service';

const refs = {
  closeModal: document.querySelector('.modal__close__btn'),
  Backdrop: document.querySelector('.backdrop__trailer'),
  trailerContainer: document.querySelector('.trailer__container'),
  ModalCont: document.querySelector('.modal__container__trailer'),
};
let filmsId = '';

//перевірка на наявність кнопки
function renderModalCheck() {
  setTimeout(() => {
    if (renderHeroRandomFilm) {
      const watchTrailer = document.getElementById('trailer');
      watchTrailer.addEventListener('click', onOpenModalTrailer);
    }
  }, 1000);
}

renderModalCheck();

refs.closeModal.addEventListener('click', onCloseModalTrailer);

function onOpenModalTrailer(event) {
  refs.Backdrop.classList.remove('is-hidden');
  refs.ModalCont.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onEscBtnPress);
  document.addEventListener('click', onBackdropClick);
  const filmID = event.target.dataset.id;
  filmsId = filmID;
  createMarkup(filmID);
  console.log(filmID);
}

function addMarkupTrailer(data) {
  const id = data.id;
  const searchTrailer = data.results.find(
    element => element.name === 'Official Trailer'
  );
  console.log(searchTrailer);
  console.log(data.id);
  const trailerKey = searchTrailer.key;
  console.log(trailerKey);
  const URL = `https://www.youtube.com/embed/${trailerKey}`;
  if (id) {
    console.log(id);
    return `<iframe class ="trailer__iframe" src="${URL}"  frameborder="0" allowfullscreen></iframe>`;
  }
}
// // const TRAILER_URL = `${BASE_URL}/movie/{movie_id}/videos`;

async function createMarkup(filmID) {
  const film = getMovieById3(filmID);
  return film
    .then(data => {
      trailerMarkup = addMarkupTrailer(data);
      refs.trailerContainer.innerHTML = trailerMarkup;
      console.log(data);
      return data;
    })
    .catch(error => {
      console.log(error);
      refs.trailerContainer.innerHTML = `<p>We are very sorry! But we couldn’t find the trailer.</p>
     <div class = "no_trailer"></div>`;
    });
}

function onCloseModalTrailer(event) {
  refs.Backdrop.classList.add('is-hidden');
  refs.ModalCont.classList.add('is-hidden');
  document.body.style.overflow = 'scroll';
  document.removeEventListener('keydown', onEscBtnPress);
  document.removeEventListener('click', onBackdropClick);
  console.log('click');
}

function onBackdropClick(event) {
  if (event.target === refs.Backdrop) {
    onCloseModalTrailer();
  }
}
function onEscBtnPress(event) {
  if (event.code === 'Escape') {
    onCloseModalTrailer();
  }
}
