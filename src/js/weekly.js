const URL = 'https://api.themoviedb.org/3/trending/movie/week?api_key=249f222afb1002186f4d88b2b5418b55';

import axios from "axios";
import { IMG_BASE_URL, BASE_URL, IMG_W400, API_KEY } from './api-vars';
 
const galleryList = document.querySelector(".gallery-weekly__list");

function getTrendData() {
const URL = 'https://api.themoviedb.org/3/trending/movie/week?api_key=249f222afb1002186f4d88b2b5418b55';

    return axios.get(URL).then((data) => {
        //  incrementPage();
         
         return data.data
      })
} 

async function getMovieGenres() {
  const { data } = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
  return data;
}

// export async function getGenres() {
//     const genres = await getMovieGenres().then(({ genres }) => genres);
//     // console.log(genres);
//   for (const genre of genres) {
//     // console.log(genre);
//     const { id, name } = genre;
//     const fullName = await getTrendData().then(({ results }) => results);
//     const oneCard = fullName.forEach(result => {
//       // console.log(result.genre_ids);
//       const genre_ids = result.genre_ids;
//       if (genre_ids.length > 2) {
//         const sliceGanre = genre_ids.slice(0, 2);
//         // console.log(sliceGanre);
//         if (sliceGanre.includes(genre.id)) {
//           console.log(genre.name);
//           const ganreName = genre.name;
//         }
//       }
//     })
      
//     const createMarkup = createMarkup(results);
// return galleryList.innerHTML = createMarkup
  // }


  
// }

export async function getGenres() {
  const genres = await getMovieGenres().then(({ genres }) => genres);

  return { genres };
}

// В createMarkup добавлен id и его вывод на карточку для работы модалки Евгения --- Виктор
function renderMarkup(results) {
   console.log(results);
   getGenres().then(({ genres }) => {
    console.log(genres);
    if (results) {
      results.forEach(film => {
        const { genre_ids, release_date } = film;
        genres.forEach(({ name, id }) => {
          if (genre_ids.includes(id)) {
            if (genre_ids.length > 2) {
              genre_ids.splice(2, genre_ids.length - 1);
            }
            genre_ids.splice(genre_ids.indexOf(id), 1, name);
          }
          film.genre_names = genre_ids.join(', ');
          if (film.release_date) {film.release_date = release_date.slice(0, 4);}
        });
      });
      const markupList = createMarkup(results);
    if (galleryList) {
      galleryList.innerHTML = markupList;
      console.log(markupList);
    }
    }
  });
}
 

function createMarkup(results) {
  console.log(results);
  return results.slice(0, 3).map(({ original_title, release_date, genre_ids, poster_path, vote_average, id}) => {
    let posterIMG = ``;
    if (poster_path) {
      posterIMG = `${IMG_BASE_URL}${IMG_W400}${poster_path}`;
    } else {
      posterIMG = 'https://i.ibb.co/C0LFwTh/OIF.jpg';
    }
    return  ` <li class='gallery-weekly__list-elem'  data-id='${id}'>           
      <img class='gallery-weekly__image ' src="${posterIMG}" alt="" loading="lazy" data-id='${id}'>
       <div class='gallery-weekly__all-info'> 
        <div class="gallery-weekly__info">
            <h3 class= 'gallery-weekly__title'>${original_title}</h3>
            <p class = 'gallery-weekly__text'> ${genre_ids} | ${release_date}</p>
        </div>
        <span class = 'gallery-weekly__rate'>${vote_average.toFixed(1)}</span>
      </div>
    </li>`
  }).join('') 

//    return galleryList.insertAdjacentElement("beforeend", markup);
    // return galleryList.innerHTML = markup
    // return console.log(markup)
      
    // return markup;
}

// getTrendData().then(({ results }) => {
//     // console.log(results.genre_ids)
//      return createMarkup(results);
   
// })

export const getWeeklyTrends = getTrendData().then(({ results }) => {
    // console.log(results)
    return renderMarkup(results);
})


