import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24479204-21740ca2d7de34b5e441c6983';

axios.defaults.baseURL = BASE_URL;

let page = 1;
const fetchFoto = name =>
  axios
    .get(
      `/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`,
    )
    .then(response => response.data);

const incrementPage = () => (page += 1);
const countPage = () => page;
const firstPage = () => (page = 1);

export { fetchFoto, incrementPage, countPage, firstPage };
