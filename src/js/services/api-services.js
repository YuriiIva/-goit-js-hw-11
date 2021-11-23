const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24479204-21740ca2d7de34b5e441c6983';
// https://pixabay.com/api/?key=24479204-21740ca2d7de34b5e441c6983&q=yellow+flowers&image_type=photo

const fetchFoto = name => {
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${name}&image_type=photo,orientation=horizontal,safesearch=true`,
  ).then(response => {
    if (!response.ok) {
      return Promise.reject(new Error(error));
    }
    return response.json();
  });
};

export default fetchFoto;
