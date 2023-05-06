import { moviesDataUpdate, saveLs } from './storage';
import { fetchMovieSearcher } from './api-service';
import { renderMarkup } from './render';
import { form } from './refs';

if (form) {
    form.addEventListener('submit', search);
  };

function search(event) {
  event.preventDefault();
  let searchPage = 1;
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
      query='';
	  saveLs('query-pg', query)
    } else {
        renderMarkup(data);
      form.reset();
    }
  });
}