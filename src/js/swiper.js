// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper';
  import Swiper from 'swiper';
  // import Swiper and modules styles
  import 'swiper/css';
  import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { renderRandomFilm } from './header';
    // import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

const swiperEl = document.querySelector('swiper-container');
  const buttonEl = document.querySelector('.slide-nextn');

buttonEl.addEventListener('click', () => {
    console.log('hi');
    renderRandomFilm();
      swiperEl.swiper.slideNext();
      
});
    
renderRandomFilm().then(({data}) => {
    const randomNumber = Math.floor(Math.random() * 21);
    const randomFilm = data.results[randomNumber];
    // console.log(randomFilm);
         return randomFilm
}).then(({original_name, name, original_title, overview, backdrop_path, vote_average}) => {
    let starIcons = '';
          for (let i = 1; i <= 5; i++) {
            let starClass = 'fa-star-o';
            if (i * 2 < vote_average) {
              starClass = 'fa-star';
            } else if (i * 2 - 1 < vote_average) {
              starClass = 'fa-star-half-o';
            }
            starIcons += `<span class="fa star ${starClass}"> </span>`;
          }
    hero.innerHTML = ` 
    <div class="container">
    <div class="hero_box1" id="hero_box1"></div>
    <div class="hero_back"></div>
    <img src="https://image.tmdb.org/t/p/original/${backdrop_path}" alt="BestFilmDay" loading="lazy" class="hero_img-head">
    <div class="hero_title-box-api">
        <h1 class="hero_first-title-api">
            ${original_title || name || original_name }
        </h1>
    </div> 
        <div class='star-rate--hero'>
                ${starIcons}
        </div>
        <div class="hero_page-box-api">
            <p>${overview}</p>
        </div>
    <div class="hero_page-box2-api">
        <p>${overview}</p>
    </div>
    <button type="button" id="trailer" class="hero_btn">Watch trailer</button>
</div>`
}).catch((error) => console.log(error))


   