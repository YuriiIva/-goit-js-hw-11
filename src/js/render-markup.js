const createMarkup = data => {
  console.log(data);
  return data
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads, largeImageURL }) =>
        `<div class="photo-card">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b >Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`,
    )
    .join('');
};

export default createMarkup;
