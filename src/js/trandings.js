import {getTrendData} from './api-service';
import { renderMarkup } from './render';
import { saveLs } from './storage';

getTrendData(1).then((data) => {
	renderMarkup(data),
	//Сохранение результата запроса в  localStorage
	saveLs("moviesData", data.results);
});