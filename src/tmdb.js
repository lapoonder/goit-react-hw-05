import axios from 'axios';

const YOUR_ACCESS_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDE5ZmJiMDc3NjNmNGNiNjdjZjdlMGQ3ODFmMThmMSIsIm5iZiI6MTczODY4Nzc4Ny45MTM5OTk4LCJzdWIiOiI2N2EyNDUyYjlhMjRmY2E2NjAyNjM1ZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yWGhbvZY2SgUEnscx1qUXVFu99PfWDz1Rw5ZA1BXAaQ';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization: `Bearer ${YOUR_ACCESS_KEY}`,
  },
};

export const queryResults = async (
  period = 'day',
  searchText,
  page = 1,
  movie_id,
  type_query
) => {
  const trending = `/trending/movie/${period}?language=en-U`,
    search_movie = `/search/movie?query=${searchText}&include_adult=true&language=en-US&page=${page}`,
    detail = `/movie/${movie_id}?language=en-U`,
    credits = `/movie/${movie_id}/credits?language=en-US`,
    reviews = `/movie/${movie_id}/reviews?language=en-US&page=${page}`;

  let query = '';

  switch (type_query) {
    case 'search_movie':
      query = search_movie;
      break;
    case 'detail':
      query = detail;
      break;
    case 'credits':
      query = credits;
      break;
    case 'reviews':
      query = reviews;
      break;
    default:
      query = trending;
  }

  const response = await axios.get(query, options);
  return response.data;
};
