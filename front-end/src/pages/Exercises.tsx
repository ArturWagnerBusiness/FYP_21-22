import { Grid } from "@mui/material";
import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import NotFound from "./NotFound";
import Create from "./exercises/Create";
import Edit from "./exercises/Edit";
import List from "./exercises/List";
import View from "./exercises/View";

export default class Exercises extends Component {
  render() {
    return (
      <Grid container spacing={2} padding={1}>
        <Grid item xs={4} md={2} container spacing={1} direction="column">
          <Grid item width={1}>
            <LinkButton
              path="/exercises/list"
              content="Exercise Library"
              fullWidth
              variant="contained"
            />
          </Grid>
          <Grid item width={1}>
            <LinkButton
              path="/exercises/create"
              content="Create Exercise"
              fullWidth
              variant="contained"
            />
          </Grid>
          <Grid item width={1}>
            <LinkButton
              path="/exercises/view"
              content="My Exercises"
              fullWidth
              variant="contained"
            />
          </Grid>
        </Grid>
        <Grid item xs={8} md={10}>
          <Routes>
            <Route path="/list" element={<List />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/view" element={<View />} />
            <Route path="/create" element={<Create />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Grid>
      </Grid>
    );
  }
}
