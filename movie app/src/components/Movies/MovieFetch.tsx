import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Toolbar,
  AppBar,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../SideBar";
import SearchBar from "../SearchBar";
import MovieGrid from "./MovieGrid";
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

const drawerWidth = 240;

interface MovieFetchProps {
  userEmail: string;
  username: string;
  onLogout: () => void;
}

const MovieFetch: React.FC<MovieFetchProps> = ({
  userEmail,
  username,
  onLogout,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [favoriteLists, setFavoriteLists] = useState<FavoriteLists>({
    Default: [],
  });
  const [selectedList, setSelectedList] = useState<string>("Default");
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[userEmail]) {
      setFavoriteLists(users[userEmail].favoriteLists);
    }
  }, [userEmail]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[userEmail]) {
      users[userEmail].favoriteLists = favoriteLists;
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [favoriteLists, userEmail]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearch = async (searchTerm: string) => {
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
    setDialogOpen(false);
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

  const handleDialogOpen = (movie: Movie) => {
    setSelectedMovie(movie);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const createNewList = (listName: string) => {
    setFavoriteLists((prevLists) => ({
      ...prevLists,
      [listName]: [],
    }));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Movie App
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, marginLeft: "auto" }}
          >
            {username}
          </Typography>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar> */}
      <Sidebar
        favoriteLists={favoriteLists}
        onSelectList={setSelectedList}
        onCreateList={createNewList}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        username={username}
        onLogOut={onLogout}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          // ml: { sm: `${drawerWidth}px` },
        }}
      >
        {/* <Toolbar /> */}
        <Container>
          <SearchBar onSearch={handleSearch} />
          {error && <div className="text-red-600">{error}</div>}
          <MovieGrid
            movies={movieData}
            favoriteLists={favoriteLists}
            selectedList={selectedList}
            addToFavorites={handleDialogOpen}
            removeFromFavorites={removeFromFavorites}
          />
        </Container>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Add to Favorite List</DialogTitle>
          <DialogContent>
            <List>
              {Object.keys(favoriteLists).map((listName) => (
                <ListItem
                  button
                  onClick={() =>
                    selectedMovie && addToFavorites(selectedMovie, listName)
                  }
                  key={listName}
                >
                  <ListItemText primary={listName} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default MovieFetch;
