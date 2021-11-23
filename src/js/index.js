import '../sass/main.scss';
import axios from 'axios';
import notiflix from 'notiflix';
import simplelightbox from 'simplelightbox';
import refs from './services/refs';

import fetchFoto from './services/api-services';
import createMarkup from './render-markup';

// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

const handleBtnSearch = e => {
  e.preventDefault();
  const value = refs.input.value;
  console.log(value);
  fetchFoto(value)
    .then(data => {
      console.log(data);
      console.log(data.hits.length);
      if (data.hits.length !== 0) {
        renderFotos(data);
      } else {
        notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      }
    })
    .catch(err => {
      notiflix.Notify.failure(err.messege);
    });
};

const renderFotos = data => {
  console.log(data);
  const markup = createMarkup(data.hits);
  refs.div.insertAdjacentHTML('beforeend', markup);
  console.log(data);
};
refs.form.addEventListener('submit', handleBtnSearch);
