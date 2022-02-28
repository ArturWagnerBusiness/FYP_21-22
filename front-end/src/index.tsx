import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

export default class Index extends Component<{}, { theme: boolean }> {
  constructor(props: any) {
    super(props);
    let theme = cookies.get("theme");
    if (theme === undefined) {
      cookies.set("theme", false, { path: "/" });
      this.state = {
        theme: false,
      };
    } else {
      this.state = {
        theme,
      };
    }
  }
  render() {
    return (
      <ThemeProvider theme={this.state.theme ? darkTheme : lightTheme}>
        <CssBaseline />
        <App
          theme={this.state.theme}
          updateTheme={(event) => {
            cookies.set("theme", event.target.checked, { path: "/" });
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
