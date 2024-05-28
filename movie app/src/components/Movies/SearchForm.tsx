import React, { ChangeEvent, FormEvent } from "react";

interface SearchFormProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
}) => (
  <form onSubmit={handleSearch}>
    <input
      type="text"
      value={searchTerm}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(e.target.value)
      }
      placeholder="Enter movie title"
    />
    <button type="submit">Search</button>
  </form>
);

export default SearchForm;
