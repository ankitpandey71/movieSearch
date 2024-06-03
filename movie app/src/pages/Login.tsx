import React, { useState } from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";

interface LoginProps {
  onLogin: (email: string, username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (isNewUser) {
      if (users[email]) {
        setError("User already exists");
      } else {
        users[email] = { username, favoriteLists: { Default: [] } };
        localStorage.setItem("users", JSON.stringify(users));
        onLogin(email, username);
      }
    } else {
      if (users[email]) {
        onLogin(email, users[email].username);
      } else {
        setError("User does not exist");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {isNewUser ? "Sign Up" : "Sign In"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isNewUser && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isNewUser ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={() => setIsNewUser(!isNewUser)}
          >
            {isNewUser
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
