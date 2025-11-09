// import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import "./App.module.css";
import type { Movie } from "../../types/movie";
import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import showToastError from "../../services/toastService";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => setIsModalOpen(true);

  // const closeModal = () => setIsModalOpen(false);

  async function handleSubmit(query: string) {
    try {
      setIsLoading(true);
      setIsError(false);

      const data = await fetchMovies(query);

      if (data.length === 0)
        showToastError("No movies found for your request.");
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function handleMovieSelect(movie: Movie) {
    setSelectedMovie(movie);
    // openModal();
  }

  function handleModalClose() {
    setSelectedMovie(null);
    // closeModal();
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid onSelect={handleMovieSelect} movies={movies} />
      )}
      {selectedMovie && (
        <MovieModal onClose={handleModalClose} movie={selectedMovie} />
      )}
    </>
  );
}

export default App;
