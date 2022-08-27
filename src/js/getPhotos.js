import axios from 'axios';

const API_KEY = '29499204-a77a5df2d9e32bd170e84cd3d';

async function getPhotos(query, page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default getPhotos;
