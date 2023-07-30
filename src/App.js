import React, { useState } from "react";

const MovieFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchMovies = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        // `http://www.omdbapi.com/?apikey=8e92b067&s=${searchTerm}`
        `https://www.omdbapi.com/?apikey=8e92b067&s=${searchTerm}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        throw new Error(data.Error);
      }
    } catch (error) {
      setError("An error occurred while searching for movies.");
    }

    setIsLoading(false);
  };

  const renderMovies = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (movies.length === 0) {
      return <p>No movies found.</p>;
    }

    return (
      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Movie Khoj</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a movie"
      />
      <button onClick={searchMovies}>Search</button>
      {renderMovies()}
    </div>
  );
};

export default MovieFinder;
