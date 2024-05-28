import React, { useState, FormEvent } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import MovieList from "./MovieList";
import FavoriteList from "./FavoriteList";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface FavoriteLists {
  [key: string]: Movie[];
}

const MovieFetch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [favoriteLists, setFavoriteLists] = useState<FavoriteLists>({});
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://www.omdbapi.com/?s=${searchTerm}&apikey=3e3e4bd7`
      );
      if (data.Response === "True") {
        setMovieData(data.Search);
        setError(null);
      } else {
        setMovieData([]);
        setError(data.Error);
      }
    } catch (err: any) {
      setMovieData([]);
      setError(err.message);
    }
  };

  const addToFavorites = (movie: Movie, listName: string) => {
    setFavoriteLists((prevLists) => {
      const list = prevLists[listName] || [];
      if (!list.some((fav) => fav.imdbID === movie.imdbID)) {
        return { ...prevLists, [listName]: [...list, movie] };
      }
      return prevLists;
    });
  };

  const removeFromFavorites = (imdbID: string, listName: string) => {
    setFavoriteLists((prevLists) => {
      const list = prevLists[listName] || [];
      return {
        ...prevLists,
        [listName]: list.filter((movie) => movie.imdbID !== imdbID),
      };
    });
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <SearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      {error && <div>Error: {error}</div>}
      <MovieList
        movies={movieData}
        favoriteLists={favoriteLists}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
      />
      <FavoriteList
        favoriteLists={favoriteLists}
        setFavoriteLists={setFavoriteLists}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        removeFromFavorites={removeFromFavorites}
      />
    </div>
  );
};

export default MovieFetch;
