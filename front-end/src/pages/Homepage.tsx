import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { Component } from "react";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Typography variant="h4" textAlign="center">
          Welcome to your own <strong>Learning Hub</strong>
        </Typography>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="h6">
              <strong>Exercises</strong>
            </Typography>
            <Typography>
              Our learning hub provides every student with the ability to create
              and complete exercises. <br /> Exercises contain formatted text,
              images and code snippets to make learning just this much more
              enjoyable. <br /> All that it takes is to login and let it begin!
            </Typography>
            <br />
            <Typography variant="h6">
              <strong>Forum</strong>
            </Typography>
            <Typography>W.I.P</Typography>
            <br />
            <Typography variant="h6">
              <strong>Profile</strong>
            </Typography>
            <Typography>W.I.P</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">
              <strong>About</strong>
            </Typography>
            <Typography>
              This project was originally design to allow for students to be
              able to help each other during their time studying in Kingston!
            </Typography>
            <br />
            <Typography variant="h6">
              <strong>Contact</strong>
            </Typography>
            <Typography>
              <ButtonGroup orientation="vertical" variant="text">
                <Button startIcon={<EmailIcon />}>
                  k1909979@kingston.ac.uk
                </Button>
                <Button startIcon={<PhoneIcon />}>(+44) 01234567890</Button>
                <Button startIcon={<HomeIcon />}>
                  Penrhyn Road, Kingston upon Thames, Surrey KT1 2EE
                </Button>
              </ButtonGroup>
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}
