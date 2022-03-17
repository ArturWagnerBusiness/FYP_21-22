import {
  Autocomplete,
  Button,
  ButtonGroup,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import axios from "axios";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import CodeIcon from "@mui/icons-material/Code";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import PublishIcon from "@mui/icons-material/Publish";
import Cookies from "universal-cookie";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import { I_ObjectCode, I_ObjectImage, I_ObjectText } from "./Create.interface";

const cookies = new Cookies();

export default class Create extends Component {
  title: string = "";
  description: string = "";
  data: (I_ObjectText | I_ObjectImage | I_ObjectCode)[] = [];
  tests: any = []; //! ADD TESTS LATER <=====
  constructor(props: any) {
    super(props);
    let possibleData = localStorage.getItem("createExercises");
    if (possibleData !== null) {
      let save = JSON.parse(possibleData);
      this.title = save.title;
      this.data = save.content;
      this.description = save.description;
      this.tests = save.tests;
    }
  }
  private delete(id: number) {
    this.data = this.data.filter((item) => {
      return item.order !== id;
    });
    this.data.forEach((item) => {
      if (item.order > id) item.order--;
    });
    this.forceUpdate();
  }
  private getLastID() {
    let largest = -1;
    this.data.forEach((item) => {
      if (item.order > largest) largest = item.order;
    });
    return largest;
  }
  private generate(type: "text" | "image" | "code") {
    let id = this.getLastID() + 1;
    if (type === "text") {
      this.data.push({
        type: "text",
        order: id,
        content: "",
        fontFamily: "",
        fontSize: 12,
        isBold: false,
        isItalic: false,
        isUnderlined: false,
      });
    } else if (type === "image") {
      this.data.push({
        type: "image",
        order: id,
        content: "",
        selfHost: false,
      });
    } else {
      this.data.push({
        type: "code",
        order: id,
        content: "",
        language: "Javascript",
      });
    }
    this.forceUpdate();
  }
  private move(self: number, by: number) {
    this.data.forEach((item) => {
      if (item.order === self) {
        item.order += by;
      } else if (item.order === self + by) {
        item.order -= by;
      }
    });
    this.forceUpdate();
  }
  private saveExercisesObject() {
    localStorage.setItem(
      "createExercises",
      JSON.stringify({
        title: this.title,
        description: this.description,
        content: this.data,
        tests: this.tests,
      })
    );
  }
  private publish() {
    let publishPackage = {
      email: cookies.get("email"),
      token: cookies.get("token"),
      page: {
        title: this.title,
        description: this.description,
        content: this.data,
        tests: this.tests,
      },
    };

    axios({
      method: "post",
      url: "/api/exercises/create",
      data: publishPackage,
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(publishPackage);
  }
  componentWillUnmount() {
    this.saveExercisesObject();
  }
  render() {
    return (
      <Grid container spacing={1} direction="column">
        {/* Save Button and Heading "Details"*/}
        <Grid item container justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Details</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => {
                this.saveExercisesObject();
              }}
            >
              quick save
            </Button>
          </Grid>
        </Grid>

        {/* Title input field */}
        <Grid item>
          <Paper elevation={8} sx={{ padding: 1 }}>
            <TextField
              fullWidth
              label="Title"
              value={this.title}
              onChange={(event) => {
                this.title = event.target.value;
                this.forceUpdate();
              }}
            />
          </Paper>
        </Grid>

        {/* Description input field */}
        <Grid item>
          <Paper elevation={8} sx={{ padding: 1 }}>
            <TextField
              multiline
              label={"Description"}
              rows={4}
              fullWidth
              value={this.description}
              onChange={(event) => {
                this.description = event.target.value;
                this.forceUpdate();
              }}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Typography variant="h5">Content</Typography>
        </Grid>
        {
          // Individual custom Content entry field
          this.data
            .sort((a, b) => {
              return a.order - b.order;
            })
            .map((item) => {
              return (
                <Grid item>
                  <Paper elevation={8} sx={{ padding: 1 }}>
                    <Grid container>
                      <Grid item>
                        <ButtonGroup
                          variant="text"
                          aria-label="outlined button group"
                          orientation="vertical"
                          style={{
                            height: "100%",
                          }}
                        >
                          {item.order !== 0 ? (
                            <Button
                              onClick={() => {
                                this.move(item.order, -1);
                              }}
                              style={{
                                height: "100%",
                              }}
                            >
                              <KeyboardArrowUpIcon />
                            </Button>
                          ) : null}
                          {item.order !== this.getLastID() ? (
                            <Button
                              onClick={() => {
                                this.move(item.order, 1);
                              }}
                              style={{
                                height: "100%",
                              }}
                            >
                              <KeyboardArrowDownIcon />
                            </Button>
                          ) : null}
                        </ButtonGroup>
                      </Grid>
                      <Grid item container xs={true} spacing={1}>
                        {item.type === "text" ? (
                          <Grid item xs={12} container spacing={1}>
                            <Grid item>
                              <Autocomplete
                                disablePortal
                                options={[
                                  "Arial",
                                  "Brush Script MT",
                                  "Courier New",
                                  "Garamond",
                                  "Georgia",
                                  "Helvetica",
                                  "Tahoma",
                                  "Times New Roman",
                                  "Trebuchet MS",
                                  "Verdana",
                                ]}
                                inputValue={item.fontFamily}
                                onInputChange={(event, value, reason) => {
                                  if (reason === "reset" && value === "")
                                    return;
                                  item.fontFamily = value;
                                  this.forceUpdate();
                                }}
                                sx={{ width: 250 }}
                                renderInput={(params: any) => (
                                  <TextField {...params} label="Font Family" />
                                )}
                              />
                            </Grid>
                            <Grid item>
                              <TextField
                                label={"Font Size"}
                                placeholder={"12 px"}
                                sx={{ width: 125 }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <FormatSizeIcon />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                            <Grid item>
                              <ToggleButtonGroup sx={{ height: "100%" }}>
                                <ToggleButton value="bold">
                                  <FormatBoldIcon />
                                </ToggleButton>
                                <ToggleButton value="italic">
                                  <FormatItalicIcon />
                                </ToggleButton>
                                <ToggleButton value="underline">
                                  <FormatUnderlinedIcon />
                                </ToggleButton>
                              </ToggleButtonGroup>
                            </Grid>
                          </Grid>
                        ) : null}
                        <Grid item xs={true}>
                          <TextField
                            placeholder={
                              item.type === "image"
                                ? "https://"
                                : item.type === "code"
                                ? "<Code/>"
                                : "Content"
                            }
                            multiline
                            rows={item.type === "image" ? 2 : 6}
                            fullWidth
                            value={item.content}
                            onChange={(event) => {
                              item.content = event.target.value;
                              this.forceUpdate();
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={() => {
                            this.delete(item.order);
                          }}
                          style={{
                            height: "100%",
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              );
            })
        }
        {/* Content field add buttons */}
        <Grid item>
          <ButtonGroup variant="outlined" fullWidth>
            <Button
              startIcon={<TextFieldsIcon />}
              onClick={() => {
                this.generate("text");
              }}
            >
              add text
            </Button>
            <Button
              startIcon={<ImageIcon />}
              onClick={() => {
                this.generate("image");
              }}
            >
              add image
            </Button>
            <Button
              startIcon={<CodeIcon />}
              onClick={() => {
                this.generate("code");
              }}
            >
              add code
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <Typography variant="h5">Tests</Typography>
        </Grid>
        {/* Publish buttons */}
        <Grid item position="relative">
          <Button
            startIcon={<PublishIcon />}
            onClick={() => {
              this.publish();
            }}
            variant="contained"
            fullWidth
          >
            publish
          </Button>
        </Grid>
      </Grid>
    );
  }
}
