import { loadLs, moviesDataUpdate, saveLs } from './storage';
import { fetchMovieSearcher } from './api-service';
import { renderMarkup } from './render';
import { form } from './refs';
import { pagination } from './pagination';
import { getTrendData } from './api-service';
import Notiflix from 'notiflix';

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
  fetchMovieSearcher(query, searchPage).then(data => {
    if (query === '' && data.total_results < 1) {
      form.reset();
      Notiflix.Notify.failure(`Sorry, you didn't enter anything in the search box, fill out the search form and click the Search button.`);
    } else if (data.total_results < 1) {
      form.reset();
      Notiflix.Notify.failure(`Sorry, there are no results for your query "${query}", try another name.`);
    } else {
      moviesDataUpdate(data);
      saveLs('query-pg', query);
      searchFilms = false;
      totalItems = data.total_results;
      pagination._options.totalItems = totalItems;
      renderMarkup(data);
      form.reset();
      pagination.reset();
      console.log(loadLs('query-pg'));
    }
  });
}

pagination.on('afterMove', event => {
  if (searchFilms) {
    getTrendData(currentPage).then(data => {
      renderMarkup(data), saveLs('moviesData', data.results);
    });
  } else {
    console.log(loadLs('query-pg'));
    console.log(event.page);

    fetchMovieSearcher(loadLs('query-pg'),(event.page)).then(data => {
      moviesDataUpdate(data);
      searchFilms = false;
      renderMarkup(data);
    })
  }
});