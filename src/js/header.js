import axios from 'axios';

const themeBtn = document.getElementById('themeBtn');
const themeMoon = document.getElementById('themeMoon');
const themeElipse = document.getElementById('themeElipse');
const themeSun = document.getElementById('themeSun');
const menuBtn = document.getElementById('menu');
const mobMenu = document.getElementById('mobile');
const blind = document.getElementById('blind');
const body = document.querySelector('body');
let backImg = document.getElementById('hero_box1');
let backColor = document.getElementById('hero_box2');
const hero = document.querySelector('.hero');
const navHeader = document.getElementById('nav-header');
const currentPath = window.location.pathname;
const navMob = document.getElementById('nav-mob');

if (currentPath === '/Cinemania/index.html') {
  navHeader.children[0].children[0].classList.add('nav_list-current');
  navMob.children[0].children[0].classList.add('nav_list-current');
} else if (currentPath === '/Cinemania/catalog.html') {
  navHeader.children[1].children[0].classList.add('nav_list-current');
  navMob.children[1].children[0].classList.add('nav_list-current');
} else if (currentPath === '/Cinemania/library.html') {
  navHeader.children[2].children[0].classList.add('nav_list-current');
  navMob.children[2].children[0].classList.add('nav_list-current');
} else {
  navHeader.children[0].children[0].classList.add('nav_list-current');
  navMob.children[0].children[0].classList.add('nav_list-current');
}

function themeKit() {
  if (themeBtn.dataset.theme === 'false') {
    themeMoon.classList.toggle('theme-moon-light');
    themeElipse.classList.toggle('theme-elipse-ligth');
    themeSun.classList.toggle('theme-sun-light');

    themeBtn.dataset.theme = 'true';

    body.classList.add('theme_sunshine');
    if (hero !== null) {
      backImg.classList.add('hero_box1-light');
      backColor.attributes.style.nodeValue = 'background-color: #F8F8F8';
    }
    localStorage.setItem('ui-theme', 'light');
  } else {
    themeMoon.classList.toggle('theme-moon-light');
    themeElipse.classList.toggle('theme-elipse-ligth');
    themeSun.classList.toggle('theme-sun-light');

    themeBtn.dataset.theme = 'false';

    body.classList.remove('theme_sunshine');
    if (hero !== null) {
      backImg.classList.remove('hero_box1-light');
      backColor.attributes.style.nodeValue = 'background-color: #0e0e0e';
    }
    localStorage.setItem('ui-theme', 'dark');
  }
}

if (localStorage.getItem('ui-theme') === 'light') {
  themeKit();
}

themeBtn.addEventListener('click', themeKit);

menuBtn.addEventListener('click', () => {
  mobMenu.classList.remove('is-hidden');
  blind.classList.remove('blind-hidden');
});

mobMenu.addEventListener('click', () => {
  mobMenu.classList.add('is-hidden');
  blind.classList.add('blind-hidden');
});

export function renderRandomFilm () {
    const data = axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=249f222afb1002186f4d88b2b5418b55");
    return data
}
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

function renderRandomFilm() {
  const data = axios.get(
    'https://api.themoviedb.org/3/trending/all/day?api_key=249f222afb1002186f4d88b2b5418b55'
  );
  return data;
}

export function renderHeroRandomFilm() {
  renderRandomFilm()
    .then(({ data }) => {
      const randomNumber = Math.floor(Math.random() * 21);
      const randomFilm = data.results[randomNumber];
      console.log(randomFilm);
      return randomFilm;
    })
    .then(({ original_name, name, original_title, overview, id }) => {
      console.log(id);
      hero.innerHTML = ` 
    <div class="container">
    <div class="hero_title-box-api">
        <h1 class="hero_first-title-api">
            ${original_title || name || original_name}
        </h1>
    </div>
        <div class="hero_page-box-api">
            <p>${overview}</p>
        </div>
    <div class="hero_page-box2-api">
        <p>${overview}</p>
    </div>
    <button type="button" id="trailer" data-id='${id}'class="hero_btn">Watch trailer</button>
</div>`;
    })
    .catch(error => console.log(error));
}

renderHeroRandomFilm();
