import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite,
  onAdd,
  onRemove,
}) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={movie.Poster}
        alt={movie.Title}
      />
      <CardContent>
        <Typography variant="h6">{movie.Title}</Typography>
        <Typography variant="subtitle1">{movie.Year}</Typography>
        {isFavorite ? (
          <Button onClick={onRemove} variant="contained" color="secondary">
            Remove
          </Button>
        ) : (
          <Button onClick={onAdd} variant="contained" color="primary">
            Add
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
