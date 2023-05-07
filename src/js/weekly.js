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

async function getGenres() {
    const genres = await getMovieGenres().then(({ genres }) => genres);
    console.log(genres);
  return { genres };
}



// function renderMarkup(data) {
//   getGenres().then(({ genres }) => {
    
//     if (genres) {
//       genres.forEach(film => {
//         const { genre_ids, release_date } = film;
//           genres.forEach(({ name, id }) => {
//           if (genre_ids.includes(id)) {
//             if (genre_ids.length > 2) {
//               genre_ids.splice(2, genre_ids.length - 1);
//             }
//             genre_ids.splice(genre_ids.indexOf(id), 1, name);
//           }
//           film.genre_names = genre_ids.join(', ');
//           if (film.release_date) {
//             film.release_date = release_date.slice(0, 4);
//           }
//         });
//       });
//     }
//     const markupList = createMarkup(data.results);
//     if (galleryList) {
//       galleryList.innerHTML = markupList;
//     }
//   });
// }
    


function createMarkup(results) {
   const markup = results.slice(0, 3).map(({ original_title, release_date, genre_ids, poster_path, vote_average
    }) =>
       ` <li class='gallery-weekly__list-elem '>           
        <a class='gallery-weekly__link' href="${poster_path}"><img class='gallery-weekly__image ' src="https://image.tmdb.org/t/p/w400/${poster_path}" alt="" loading="lazy" ></a>
        <div class="gallery-weekly__info">
            <h3 class= 'gallery-weekly__title'>${original_title}</h3>
            <b class = 'gallery-weekly__text'> ${genre_ids} | ${release_date}</b>
        </div>
        <b class = 'gallery-weekly__rate'>${vote_average}</b>
    </li>`
    ).join('') 

//    return galleryList.insertAdjacentElement("beforeend", markup);
    return galleryList.innerHTML = markup
    // return console.log(markup)
      
    
}

getTrendData().then(({ results }) => {
    console.log(results.genre_ids)
     return createMarkup(results);
   
})

export const getWeeklyTrends = getTrendData().then(({ results }) => {
    console.log(results)
    return createMarkup(results);
})

// export const getMovieWeeklyTrends = getGenres().then(({ genres }) => {
//     console.log(genres);
//     return renderMarkup()
// })