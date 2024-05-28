import React, { useState } from "react";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieListProps {
  movies: Movie[];
  favoriteLists: { [key: string]: Movie[] };
  addToFavorites: (movie: Movie, listName: string) => void;
  removeFromFavorites: (imdbID: string, listName: string) => void;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  favoriteLists,
  addToFavorites,
  removeFromFavorites,
}) => {
  const [showDropdown, setShowDropdown] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [selectedFavoriteList, setSelectedFavoriteList] = useState<{
    [key: string]: string | null;
  }>({});

  const handleShowDropdown = (imdbID: string) => {
    setShowDropdown((prev) => ({ ...prev, [imdbID]: true }));
  };

  const handleSelectList = (imdbID: string, listName: string) => {
    setSelectedFavoriteList((prev) => ({ ...prev, [imdbID]: listName }));
  };

  const handleAddToFavorites = (movie: Movie) => {
    const listName = selectedFavoriteList[movie.imdbID];
    if (listName) {
      addToFavorites(movie, listName);
      setShowDropdown((prev) => ({ ...prev, [movie.imdbID]: false }));
    }
  };

  return (
    <div>
      <h2>Search Results</h2>
      {movies.map(({ imdbID, Title, Year, Poster }) => {
        const isFavorite = Object.keys(favoriteLists).some((listName) =>
          favoriteLists[listName].some((movie) => movie.imdbID === imdbID)
        );

        return (
          <div key={imdbID}>
            <h3>{Title}</h3>
            <p>Year: {Year}</p>
            <img src={Poster} alt={Title} />
            {isFavorite ? (
              <button
                onClick={() => {
                  const listName = Object.keys(favoriteLists).find((listName) =>
                    favoriteLists[listName].some(
                      (movie) => movie.imdbID === imdbID
                    )
                  );
                  if (listName) removeFromFavorites(imdbID, listName);
                }}
              >
                Remove from Favorites
              </button>
            ) : (
              <div>
                <button onClick={() => handleShowDropdown(imdbID)}>
                  Add to Favorites
                </button>
                {showDropdown[imdbID] && (
                  <div>
                    <select
                      value={selectedFavoriteList[imdbID] || ""}
                      onChange={(e) => handleSelectList(imdbID, e.target.value)}
                    >
                      <option value="" disabled>
                        Select a favorite list
                      </option>
                      {Object.keys(favoriteLists).map((listName) => (
                        <option key={listName} value={listName}>
                          {listName}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() =>
                        handleAddToFavorites({ imdbID, Title, Year, Poster })
                      }
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
