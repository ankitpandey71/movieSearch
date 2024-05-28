import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h4" color="primary" sx={{ flexGrow: 1 }}>
          Welcome to Watchlists
        </Typography>
        <Button color="inherit">Guest</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
