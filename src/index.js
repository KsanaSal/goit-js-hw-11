import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/style.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const btnSearch = document.querySelector('button');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', e => {
  e.preventDefault();
  console.dir(e);
  console.dir(input);
  console.log(input.value);
  gallery.innerHTML = '';
  getPhotos(input.value).then(data => {
    listImages(data.hits);
    console.log(data);
  });
});

const API_KEY = '29499204-a77a5df2d9e32bd170e84cd3d';
async function getPhotos(query) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

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
  gallery.insertAdjacentHTML('afterbegin', images);
  lightbox.refresh();
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  // sourceAttr: 'srcset'
});

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень
