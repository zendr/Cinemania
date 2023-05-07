import {getTrendData} from './api-service';
import { renderMarkup } from './render';
import { loadLs, saveLs, loadLs } from './storage';

let searchPage = 1;


getTrendData(searchPage).then((data) => {
	renderMarkup(data);
	saveLs('totalItems', data.total_results);
	console.log(loadLs('totalItems'))
	saveLs("moviesData", data.results);
});