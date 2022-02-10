import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

export default class Index extends Component<{}, { theme: boolean }> {
  state = {
    theme: false,
  };
  render() {
    return (
      <ThemeProvider theme={this.state.theme ? darkTheme : lightTheme}>
        <CssBaseline />
        <App
          theme={this.state.theme}
          updateTheme={(event) => {
            this.setState({ theme: event.target.checked });
          }}
        />
      </ThemeProvider>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);
