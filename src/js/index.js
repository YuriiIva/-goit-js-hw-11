import '../sass/main.scss';
import axios from 'axios';
import notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import refs from './services/refs';

import { fetchFoto, incrementPage, countPage, firstPage } from './services/api-services';
import createMarkup from './render-markup';

let lightbox = null;

const handleBtnSearch = e => {
  e.preventDefault();
  restart();
  getFoto();
};

const restart = () => {
  refs.div.innerHTML = '';
  firstPage();
};

const getFoto = async () => {
  const value = refs.input.value;
  try {
    const data = await fetchFoto(value);
    if (data.hits.length !== 0) {
      let allPages = Math.ceil(data.total / data.hits.length);

      if (countPage() >= allPages) {
        notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        refs.btnLoadMore.classList.add('is-hidden');
        return;
      }
      renderFotos(data);
      refs.btnLoadMore.classList.remove('is-hidden');
      lightbox = new SimpleLightbox('.gallery a', {
        captions: 'alt',
        captionsDelay: 250,
      });
    } else {
      refs.btnLoadMore.classList.add('is-hidden');
      refs.div.innerHTML = '';
      notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }
  } catch (error) {
    handleErro(error);
  }
};

const handleErro = erro => {
  refs.input.value = '';
  refs.div.innerHTML = '';
  notiflix.Notify.failure(erro.messege);
};

const renderFotos = data => {
  const markup = createMarkup(data.hits);
  refs.div.insertAdjacentHTML('beforeend', markup);
};

const onLoadMore = () => {
  refs.btnLoadMore.classList.add('is-hidden');
  incrementPage();
  getFoto();
  lightbox.refresh();
};

refs.form.addEventListener('submit', handleBtnSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);

// let lightbox = new SimpleLightbox('.gallery a', {
//   captions: 'alt',
//   captionsDelay: 250,
// }).refresh();
