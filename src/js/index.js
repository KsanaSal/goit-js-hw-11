import SimpleLightbox from 'simplelightbox';

import getPhotos from './getPhotos';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/style.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const btnMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let page = 1;

form.addEventListener('submit', e => {
  e.preventDefault();
  // console.dir(e);
  // console.dir(input);
  // console.log(input.value);
  gallery.innerHTML = '';
  getPhotos(input.value, page).then(data => {
    listImages(data.hits);
    console.log(data);
  });
});

function listImages(photos) {
  console.log(photos);
  const images = photos
    .map(photo => {
      // console.log(photo);
      return `
        <a class="gallery-item" href="${photo.largeImageURL}">
        <div class="photo-card">
        <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${photo.likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${photo.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${photo.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${photo.downloads}
          </p>
        </div>
      </div>
      </a>
      `;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', images);
  lightbox.refresh();
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
// console.log(btnMore);
btnMore.addEventListener('click', () => {
  page += 1;
  getPhotos(input.value, page).then(data => {
    listImages(data.hits);
    console.log(data);
  });
})