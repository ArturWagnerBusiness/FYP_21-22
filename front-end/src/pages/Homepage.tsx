import { Button, Grid, Menu, MenuItem } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LinkStyled } from "../styledComponents/components";

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <Grid spacing={6}>
          <LinkStyled to="/">
            <Button>Home</Button>
          </LinkStyled>
          <LinkStyled to="/questions">
            <Button>Questions</Button>
          </LinkStyled>
          <LinkStyled to="/forum">
            <Button>Forum</Button>
          </LinkStyled>
          <LinkStyled to="/profile">
            <Button>Profile</Button>
          </LinkStyled>
        </Grid>
      </div>
    );
  }
}
