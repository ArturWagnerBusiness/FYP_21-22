import React, { Component } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Grid, Paper, Switch } from "@mui/material";
import NotFound from "./pages/NotFound";

// style
import { S_MainPaper, S_NavigationPaper, S_ThemeButton } from "./App.style";

// pages
import Questions from "./pages/Questions";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import { I_AppProps } from "./App.interface";
import HomePage from "./pages/HomePage";
import LinkButton from "./components/LinkButton";
import Login from "./pages/Login";

export default class App extends Component<I_AppProps> {
  state = {
    isLoggedIn: false,
  };
  setLoggedStatus = (data: boolean) => {
    this.setState({ isLoggedIn: data });
  };
  render() {
    return (
      <Router>
        {/* Theme change button */}
        {/* Navigation bar */}
        <Container maxWidth="xl">
          <Paper elevation={6} sx={S_NavigationPaper}>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item spacing={6}>
                <LinkButton path="/" content="HomePage" />
                <LinkButton path="/questions/list" content="Questions" />
                <LinkButton path="/forum/list" content="Forum" />
                <LinkButton path="/profile/view" content="Profile" />
              </Grid>
              <Grid item>
                <LinkButton path="/login" content="Login" />
                <Switch
                  checked={this.props.theme}
                  onChange={this.props.updateTheme}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={S_ThemeButton}
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
        {/* Individual page content */}
        <Container maxWidth="xl">
          <Paper elevation={3} sx={S_MainPaper}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/questions*" element={<Questions />} />
              <Route path="/forum*" element={<Forum />} />
              <Route path="/profile*" element={<Profile />} />
              <Route path="/login*" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Paper>
        </Container>
      </Router>
    );
  }
}
