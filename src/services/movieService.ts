import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieHttpResponse {
  results: Movie[];
}

const instance = axios.create({
  baseURL: "https://api.themoviedb.org",
  // params: {
  //   // твої параметри
  // },
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await instance.get<MovieHttpResponse>(
    "/3/search/movie?include_adult=false&language=en-US&page=1",
    { params: { query: query } }
  );
  // .then((res) => res.data);
  return response.data.results;
};
