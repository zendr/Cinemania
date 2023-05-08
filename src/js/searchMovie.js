import { moviesDataUpdate, saveLs } from './storage';
import { fetchMovieSearcher } from './api-service';
import { renderMarkup } from './render';
import { form } from './refs';
import { pagination } from './pagination';
import { getTrendData } from './api-service';

let searchPage = 1;
let query = '';
let searchFilms = true;
let totalItems = 0;

if (form) {
  form.addEventListener('submit', search);
}

function search(event) {
  event.preventDefault();
  query = event.currentTarget.elements.search.value.toLowerCase().trim();
  saveLs('query-pg', query);
  if (query == '') {
    form.reset();
  } else {
    form.reset();
  }

  fetchMovieSearcher(query, searchPage).then(data => {
    moviesDataUpdate(data);
    if (data.results.length < 1 || query === '') {
      form.reset();
      query = '';
      saveLs('query-pg', query);
    } else {
      searchFilms = false;
      totalItems = data.total_results;
      pagination._options.totalItems = totalItems;
      // console.log(pagination);
      renderMarkup(data);
      // saveLs('totalItems', data.total_results);
      form.reset();
      pagination.reset();
    }
  });
}

pagination.on('afterMove', event => {
  const currentPage = event.page;
  if (searchFilms) {
    getTrendData(currentPage).then(data => {
      renderMarkup(data), saveLs('moviesData', data.results);
    });
  } else {
    fetchMovieSearcher(query, currentPage).then(data => {
      moviesDataUpdate(data);
      if (data.results.length < 1 || query === '') {
        form.reset();
        query = '';
        saveLs('query-pg', query);
      } else {
        searchFilms = false;
        renderMarkup(data);
        form.reset();
      }
    });
  }
})