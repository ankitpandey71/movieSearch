import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Toolbar,
  Divider,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface SidebarProps {
  favoriteLists: { [key: string]: any };
  onSelectList: (listName: string) => void;
  onCreateList: (listName: string) => void;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const drawerWidth = 240;

const Sidebar: React.FC<SidebarProps> = ({
  favoriteLists,
  onSelectList,
  onCreateList,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newListName, setNewListName] = useState<string>("");

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewListName("");
  };

  const handleCreateList = () => {
    if (newListName) {
      onCreateList(newListName);
      handleDialogClose();
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            My Favorite Lists
          </ListSubheader>
        }
      >
        {Object.keys(favoriteLists).map((listName) => (
          <ListItem
            button
            key={listName}
            onClick={() => onSelectList(listName)}
          >
            <ListItemText primary={listName} />
          </ListItem>
        ))}
        <ListItem button onClick={handleDialogOpen}>
          <ListItemText primary="Add New List" />
          <AddIcon />
        </ListItem>
      </List>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Create New Favorite List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="List Name"
            fullWidth
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateList} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <nav aria-label="mailbox folders">
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
    </nav>
  );
};

export default Sidebar;
