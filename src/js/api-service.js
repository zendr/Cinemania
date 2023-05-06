import axios from 'axios';

//import { createGenresFromID, createYear } from '../data/data-combine';

import { API_KEY, TREND_URL, SEARCH_URL, ID_URL } from './api-vars';


  // Получение полной информации о трендах
  export async function getTrendData(page) {
    try {
      const { data } = await axios.get(
        `${TREND_URL}?api_key=${API_KEY}&page=${page}`
      );

      return data;
    } catch (error) {
      console.error('Smth wrong with api get full trends' + error);
    }
  };

  // Фетч по поисковому запросу
  export async function fetchMovieSearcher(text, page) {
    try {
      const { data } = await axios.get(
        `${SEARCH_URL}?api_key=${API_KEY}&query=${text}&page=${page}`
      );

      return data;
    } catch (error) {
      console.error('Smth wrong with api search fetch' + error);
    }
  };

  // Фетч фильма по его ID
  export async function getMovieById(id) {
    try {
      const { data } = await axios.get(`${ID_URL}${id}?api_key=${API_KEY}`);

      const result = {
        ...data,
        year: createYear(data),
        customGenres: createGenresFromID(data),
      };

      return result;
    } catch (error) {
      console.error('Smth wrong with api ID fetch' + error);
    }
  };
