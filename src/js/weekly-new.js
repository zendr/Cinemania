import axios from "axios";
import { IMG_BASE_URL, BASE_URL, IMG_W400, API_KEY } from './api-vars';
 
const galleryList = document.querySelector(".gallery-weekly__list");

 function getAllDataWeekly() {
    return axios.get(
        `${TREND_URL}?api_key=${API_KEY}&page=${page}`
    ).then((data) => {
        return data.data
    }
      )
}
export async function getMovieGenres() {
  const { data } = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  ).then(({ generes }) => {
      console.log(generes);
    return generes
  })
}
 


