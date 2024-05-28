import React, { ChangeEvent, useState } from "react";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface FavoriteLists {
  [key: string]: Movie[];
}

interface FavoriteListProps {
  favoriteLists: FavoriteLists;
  setFavoriteLists: React.Dispatch<React.SetStateAction<FavoriteLists>>;
  selectedList: string | null;
  setSelectedList: React.Dispatch<React.SetStateAction<string | null>>;
  removeFromFavorites: (imdbID: string, listName: string) => void;
}

const FavoriteList: React.FC<FavoriteListProps> = ({
  favoriteLists,
  setFavoriteLists,
  selectedList,
  setSelectedList,
  removeFromFavorites,
}) => {
  const [newListName, setNewListName] = useState<string>("");

  const createFavoriteList = () => {
    if (newListName && !favoriteLists[newListName]) {
      setFavoriteLists((prevLists) => ({ ...prevLists, [newListName]: [] }));
      setSelectedList(newListName);
      setNewListName("");
    }
  };

  return (
    <div>
      <h2>Create a New Favorite List</h2>
      <input
        type="text"
        value={newListName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewListName(e.target.value)
        }
        placeholder="New list name"
      />
      <button onClick={createFavoriteList}>Create List</button>

      <h2>Favorite Lists</h2>
      <div>
        {Object.keys(favoriteLists).map((listName) => (
          <button key={listName} onClick={() => setSelectedList(listName)}>
            {listName}
          </button>
        ))}
      </div>
      {selectedList && (
        <div>
          <h3>{selectedList} Movies</h3>
          {favoriteLists[selectedList].map(
            ({ imdbID, Title, Year, Poster }) => (
              <div key={imdbID}>
                <h4>{Title}</h4>
                <p>Year: {Year}</p>
                <img src={Poster} alt={Title} />
                <button
                  onClick={() => removeFromFavorites(imdbID, selectedList)}
                >
                  Remove from Favorites
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FavoriteList;
