import React from "react";
import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieGridProps {
  movies: Movie[];
  favoriteLists: { [key: string]: Movie[] };
  selectedList: string | null;
  addToFavorites: (movie: Movie, listName: string) => void;
  removeFromFavorites: (imdbID: string, listName: string) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  favoriteLists,
  selectedList,
  addToFavorites,
  removeFromFavorites,
}) => {
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => {
        const isFavorite = Object.keys(favoriteLists).some((listName) =>
          favoriteLists[listName].some((fav) => fav.imdbID === movie.imdbID)
        );

        return (
          <Grid item xs={12} sm={6} md={3} key={movie.imdbID}>
            <MovieCard
              movie={movie}
              isFavorite={isFavorite}
              onAdd={() => {
                if (selectedList) addToFavorites(movie, selectedList);
              }}
              onRemove={() => {
                const listName = Object.keys(favoriteLists).find((listName) =>
                  favoriteLists[listName].some(
                    (fav) => fav.imdbID === movie.imdbID
                  )
                );
                if (listName) removeFromFavorites(movie.imdbID, listName);
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MovieGrid;
