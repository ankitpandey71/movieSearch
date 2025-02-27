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
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../SideBar";
import SearchBar from "../SearchBar";
import MovieGrid from "./MovieGrid";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [searchMade, setSearchMade] = useState<boolean>(false);

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
    setLoading(true);
    setSearchMade(true);
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
    setLoading(false);
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
    if (Object.keys(favoriteLists).length > 1) {
      setSelectedMovie(movie);
      setDialogOpen(true);
    } else {
      addToFavorites(movie, "Default");
    }
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
      <AppBar
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
            Movie Search
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar
        favoriteLists={favoriteLists}
        onSelectList={setSelectedList}
        onCreateList={createNewList}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        username={username}
        onLogout={onLogout}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          <Typography color="red" variant="h4" component="h1" gutterBottom>
            Welcome To Movie Search
          </Typography>
          <Typography variant="h6" component="p">
            Browse Movies & add them to watch List
          </Typography>
        </Box>
        <Container>
          <SearchBar onSearch={handleSearch} />
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="50vh"
            >
              <CircularProgress />
            </Box>
          ) : searchMade && movieData.length === 0 ? (
            <Typography variant="h6" align="center" color="textSecondary">
              No movies found. Please try a different search term.
            </Typography>
          ) : (
            !searchMade && (
              <Typography variant="h6" align="center" color="textSecondary">
                Make a search to find movies.
              </Typography>
            )
          )}
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
          <DialogTitle>Add to Watch List</DialogTitle>
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
