import { ApiKey } from '../refs';
import { pagination } from '../pagination';
const axios = require('axios').default;

export async function fetchFilms(inputValue, page) {
  try {
    const fetchResult = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&language=en-US&query=${inputValue}&page=${page}&include_adult=false`
    );
    // searchFilms = false;
    if (page === 1) {
      pagination.reset(fetchResult.data.total_results);
    }

    return fetchResult.data.results;
  } catch (error) {
    console.error(error);
  }
}
