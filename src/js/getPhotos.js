import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = '29499204-a77a5df2d9e32bd170e84cd3d';
async function getPhotos(query) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
    );
      if (response.data.totalHits > 0) {
        Notify.success(`Hooray! We found ${response.data.totalHits} images.`);

      console.log(response);
      return response.data;
      } 
      Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)
  } catch (error) {
    console.error(error);
  }
}

export default getPhotos;
