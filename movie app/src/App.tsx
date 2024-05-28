import React from "react";
import { Box } from "@mui/material";
import MovieFetch from "../src/components/MovieFetch";

const App: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <MovieFetch />
    </Box>
  );
};

export default App;
