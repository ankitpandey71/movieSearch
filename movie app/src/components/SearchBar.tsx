import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mb-4">
      <TextField
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for movies..."
        sx={{ width: "60%", marginRight: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
