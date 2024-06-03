import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Button,
} from "@mui/material";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface FavoriteListProps {
  favoriteLists: { [key: string]: Movie[] };
  onSelectList: (listName: string) => void;
  onRemoveMovie: (imdbID: string, listName: string) => void;
}

const FavoriteList: React.FC<FavoriteListProps> = ({
  favoriteLists,
  onSelectList,
  onRemoveMovie,
}) => {
  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          My Watch Lists
        </ListSubheader>
      }
    >
      {Object.keys(favoriteLists).map((listName) => (
        <div key={listName}>
          <ListItem button onClick={() => onSelectList(listName)}>
            <ListItemText primary={listName} />
          </ListItem>
          {favoriteLists[listName].map((movie) => (
            <ListItem key={movie.imdbID} sx={{ paddingLeft: 4 }}>
              <ListItemText primary={movie.Title} />
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => onRemoveMovie(movie.imdbID, listName)}
              >
                Remove
              </Button>
            </ListItem>
          ))}
        </div>
      ))}
    </List>
  );
};

export default FavoriteList;
