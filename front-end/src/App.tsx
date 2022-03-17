import { Component } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import Cookies from "universal-cookie";

// Component Style and Typing
import { S_MainPaper, S_NavigationPaper, S_ThemeButton } from "./App.style";
import { I_AppProps, I_AppState } from "./App.interface";

// Pages
import HomePage from "./pages/HomePage";
import Exercises from "./pages/Exercises";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Components
import LinkButton from "./components/LinkButton";

const cookies = new Cookies();

export default class App extends Component<I_AppProps, I_AppState> {
  constructor(props: I_AppProps) {
    super(props);
    let token = cookies.get("token");
    this.state = {
      isLoggedIn: token === undefined ? false : true,
      shownEmail: token === undefined ? "" : cookies.get("email"),
    };
  }
  setLoggedStatus = (data: boolean) => {
    if (!data) {
      cookies.remove("token");
      cookies.remove("email");
    }
    this.setState({
      isLoggedIn: data,
      shownEmail: data ? cookies.get("email") : "",
    });
  };
  render() {
    return (
      <Router>
        {/* Navigation bar */}
        <Container maxWidth="xl">
          <Paper elevation={6} sx={S_NavigationPaper}>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item spacing={6}>
                <LinkButton path="/" content="HomePage" />
                <LinkButton
                  path="/exercises/list"
                  content="Exercises"
                  disabled={!this.state.isLoggedIn}
                />
                <LinkButton
                  path="/forum/list"
                  content="Forum"
                  disabled={!this.state.isLoggedIn}
                />
                <LinkButton
                  path="/profile/view"
                  content="Profile"
                  disabled={!this.state.isLoggedIn}
                />
              </Grid>
              <Grid item>
                {this.state.isLoggedIn ? (
                  <div>
                    <Typography>
                      Logged in as {this.state.shownEmail}
                    </Typography>
                    <Button
                      onClick={() => {
                        this.setLoggedStatus(false);
                      }}
                    >
                      Log out
                    </Button>
                  </div>
                ) : (
                  <LinkButton path="/login" content="Login" />
                )}
                {/* Theme change button */}
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
              <Route path="/exercises*" element={<Exercises />} />
              <Route path="/forum*" element={<Forum />} />
              <Route path="/profile*" element={<Profile />} />
              <Route
                path="/login*"
                element={<Login setLoggedStatus={this.setLoggedStatus} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Paper>
        </Container>
      </Router>
    );
  }
}
