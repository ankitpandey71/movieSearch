import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

interface SidebarProps {
  favoriteLists: { [key: string]: any };
  onSelectList: (listName: string) => void;
  onCreateList: (listName: string) => void;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  username: string;
  onLogOut: any;
}

const Sidebar: React.FC<SidebarProps> = ({
  favoriteLists,
  onSelectList,
  onCreateList,
  mobileOpen,
  handleDrawerToggle,
  username,
  onLogOut,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Watch Lists
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {Object.keys(favoriteLists).map((listName) => (
          <ListItem
            button
            key={listName}
            onClick={() => onSelectList(listName)}
          >
            <ListItemText primary={listName} />
          </ListItem>
        ))}
        <ListItem
          button
          onClick={() => {
            const newListName = prompt("Enter new list name");
            if (newListName) {
              onCreateList(newListName);
            }
          }}
        >
          <ListItemText primary="Create New List" />
        </ListItem>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Avatar
          alt={username}
          src="/static/images/avatar/1.jpg"
          sx={{ mr: 2 }}
        />
        <Typography variant="body1">{username}</Typography>
        <IconButton
          aria-label="more"
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={onLogOut}>Logout</MenuItem>
        </Menu>
      </Box>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        height: "100vh",
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            height: "100vh",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            height: "100vh",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
