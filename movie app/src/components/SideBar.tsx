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
  Stack,
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
}

const Sidebar: React.FC<SidebarProps> = ({
  favoriteLists,
  onSelectList,
  onCreateList,
  mobileOpen,
  handleDrawerToggle,
  username,
}) => {
  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Favorite Lists
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
      <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
        <Avatar
          alt={username}
          src="/static/images/avatar/1.jpg"
          sx={{ mr: 2 }}
        />
        <Typography variant="body1">{username}</Typography>
      </Box>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
