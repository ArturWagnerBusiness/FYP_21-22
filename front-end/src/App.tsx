import React, { Component } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button, Container, Grid, Paper, Switch } from "@mui/material";
import NotFound from "./pages/NotFound";

// style
import { S_LinkButton, S_MainPaper, S_ThemeButton } from "./App.style";

// pages
import Questions from "./pages/Questions";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import { I_AppProps, I_AppState } from "./App.interface";
import HomePage from "./pages/HomePage";

export default class App extends Component<I_AppProps, I_AppState> {
  render() {
    return (
      <Router>
        <Switch
          checked={this.props.theme}
          onChange={this.props.updateTheme}
          inputProps={{ "aria-label": "controlled" }}
          sx={S_ThemeButton}
        />
        <Container maxWidth={false}>
          <Grid spacing={6}>
            <Link style={S_LinkButton} to="/">
              <Button>Home</Button>
            </Link>
            <Link style={S_LinkButton} to="/questions">
              <Button>Questions</Button>
            </Link>
            <Link style={S_LinkButton} to="/forum">
              <Button>Forum</Button>
            </Link>
            <Link style={S_LinkButton} to="/profile">
              <Button>Profile</Button>
            </Link>
          </Grid>
        </Container>
        <Container maxWidth="xl">
          <Paper elevation={12} sx={S_MainPaper}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Paper>
        </Container>
      </Router>
    );
  }
}
