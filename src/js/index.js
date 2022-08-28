import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getPhotos from './getPhotos';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/style.css';

// Selection of elements
const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const btnMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const myButton = document.getElementById('myBtn');

// Creation constans
const PER_PAGE = 40;
let page = 1;

// Add styles
btnMore.style.visibility = 'hidden';
Notify.init({
  fontSize: '16px',
  width: '350px',
  borderRadius: '10px',
});

// Processing promis
function addPhotos(value, page) {
  getPhotos(value, page).then(data => {
    if (data.totalHits > 0) {
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    } else
      Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    listImages(data.hits);
    if (data.totalHits > PER_PAGE * page) {
      btnMore.style.visibility = 'visible';
    }
  });
}

// Listening to form
form.addEventListener('submit', e => {
  e.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  btnMore.style.visibility = 'hidden';
  if (!!input.value.trim()) {
    addPhotos(input.value.trim(), page);
  } else {
    Notify.warning('Please put the text in search field', {
      position: 'center-top',
      distance: '80px',
    });
  }
});

// Create blok photos in html
function listImages(photos) {
  const images = photos
    .map(photo => {
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

// Working with SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Listening to button-more
btnMore.addEventListener('click', () => {
  page += 1;
  getPhotos(input.value, page)
    .then(data => {
      listImages(data.hits);
      if (data.totalHits <= PER_PAGE * page) {
        btnMore.style.visibility = 'hidden';
        Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
      }
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
    })
    .finally(() => {
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
      });
    });
});

// When the user scrolls down 20px from the top of the document, show the myButton
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    myButton.style.display = 'block';
  } else {
    myButton.style.display = 'none';
  }
}

// When the user clicks on the myButton, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

myButton.addEventListener('click', topFunction);
