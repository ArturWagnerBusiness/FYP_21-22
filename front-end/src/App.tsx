import React, { Component } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Questions from "./pages/Questions";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import Homepage from "./pages/Homepage";
import { Container, Paper, Switch } from "@mui/material";
import { S_MainPaper, S_ThemeButton } from "./styles/general";
import NotFound from "./pages/NotFound";

export default class App extends Component<{
  theme: boolean;
  updateTheme: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> {
  render() {
    return (
      <Router>
        <Switch
          checked={this.props.theme}
          onChange={this.props.updateTheme}
          inputProps={{ "aria-label": "controlled" }}
          sx={S_ThemeButton}
        />
        <Container maxWidth="xl">
          <Paper elevation={12} sx={S_MainPaper}>
            <Routes>
              <Route path="/" element={<Homepage />} />
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
