const axios = require('axios').default;
import { pagination } from '../pagination';
import { ApiKey } from '../refs';

const URL = 'https://api.themoviedb.org/3/trending';

let mediaType = 'all';
let timeWindow = 'day';

export async function fetchMoviesTrending(page) {
  try {
    const responce = await axios.get(
      `${URL}/${mediaType}/${timeWindow}?api_key=${ApiKey}&page=${page}`
    );
    if (page === 1) {
      pagination.reset(responce.data.total_results);
    }
    return responce.data.results;
  } catch (error) {
    console.error(error);
  }
}
