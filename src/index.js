import axios from 'axios';

const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const btnSearch = document.querySelector('button');

form.addEventListener('submit', e => {
  e.preventDefault();
  console.dir(e);
  console.dir(input);
  console.log(input.value);
  getPhotos(input.value);
});

const API_KEY = '29499204-a77a5df2d9e32bd170e84cd3d';
async function getPhotos(query) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
