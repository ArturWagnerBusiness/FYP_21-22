import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Component } from "react";
import { I_LoginProps, I_LoginState } from "./Login.interface";
import { S_LoginTitle, S_RowItem, S_SendButton } from "./Login.style";

export default class Login extends Component<I_LoginProps, I_LoginState> {
  state = {
    isSendDisabled: false,
    buttonWaitTime: 0,
    valueEmail: "",
    valueCode: "",
  };
  timer: NodeJS.Timer | undefined;
  buttonPressEffect = () => {
    if (this.timer) clearInterval(this.timer);
    this.setState({
      isSendDisabled: true,
      buttonWaitTime: 60,
    });

    this.timer = setInterval(() => {
      if (this.state.buttonWaitTime <= 0) {
        if (this.timer) clearInterval(this.timer);
        this.setState({
          isSendDisabled: false,
          buttonWaitTime: 0,
        });
      } else {
        this.setState((state, props) => {
          return {
            buttonWaitTime: state.buttonWaitTime - 1,
          };
        });
      }
    }, 1000); // Make user wait 5 additional seconds to make sure that they waited +60s so the server doesn't reject their request.
  };
  sendCode = () => {
    if (this.state.buttonWaitTime !== 0) return;
    this.buttonPressEffect();
    axios
      .post("/api/authenticate/request", {
        email: this.state.valueEmail,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  fakeLogin = () => {
    axios
      .post("/api/authenticate/provide", {
        email: this.state.valueEmail,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentWillUnmount = () => {
    if (this.timer) clearInterval(this.timer);
  };
  render = () => {
    return (
      <div>
        <Container maxWidth="sm">
          <Typography variant="h3" sx={S_LoginTitle}>
            Login
          </Typography>
          <Grid sx={S_RowItem}>
            <TextField
              id="user-id"
              label="Your Kingston ID"
              variant="outlined"
              fullWidth
              value={this.state.valueEmail}
              onChange={(e) => {
                this.setState({ valueEmail: e.target.value });
              }}
            />
          </Grid>
          <Grid sx={S_RowItem} container spacing={2}>
            <Grid item xs={8}>
              <TextField
                id="user-code"
                label="Email verification code"
                variant="outlined"
                fullWidth
                value={this.state.valueCode}
                onChange={(e) => {
                  console.log(e.target.value);
                  this.setState({ valueCode: e.target.value });
                }}
                inputProps={{
                  step: 1,
                  type: "number",
                }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                onClick={this.sendCode}
                size="large"
                disabled={this.state.isSendDisabled}
              >
                {this.state.isSendDisabled ? (
                  <Typography variant="caption">
                    Wait {this.state.buttonWaitTime}s before re-sending.
                  </Typography>
                ) : (
                  <Typography>Send code</Typography>
                )}
              </Button>
            </Grid>
          </Grid>
          <Grid sx={S_SendButton}>
            <Button
              variant="contained"
              onClick={this.fakeLogin}
              size="large"
              disabled={this.state.valueCode.length < 8}
              fullWidth
            >
              Login
            </Button>
          </Grid>
        </Container>
      </div>
    );
  };
}
