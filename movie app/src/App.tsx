import React, { useState } from "react";
import MovieFetch from "./components/Movies/MovieFetch";
import Login from "../src/pages/Login";

const App: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = (email: string, username: string) => {
    setUserEmail(email);
    setUsername(username);
  };

  const handleLogout = () => {
    setUserEmail(null);
    setUsername(null);
  };

  return (
    <div>
      {userEmail ? (
        <MovieFetch
          userEmail={userEmail}
          username={username!}
          onLogout={handleLogout}
        />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
