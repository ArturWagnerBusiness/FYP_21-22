import {
  Button,
  ButtonGroup,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { Component } from "react";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import CodeIcon from "@mui/icons-material/Code";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import PublishIcon from "@mui/icons-material/Publish";

type T_Fonts = "Arial";
type T_Languages = "Javascript";
interface I_ObjectGeneral {
  content: string;
  order: number;
}
interface I_ObjectText extends I_ObjectGeneral {
  type: "text";
  fontSize: number;
  fontFamily: T_Fonts;
  isBold: boolean;
  isItalic: boolean;
  isUnderlined: boolean;
}
interface I_ObjectImage extends I_ObjectGeneral {
  type: "image";
  selfHost: boolean;
}
interface I_ObjectCode extends I_ObjectGeneral {
  type: "code";
  language: T_Languages;
}
export default class Create extends Component {
  data: (I_ObjectText | I_ObjectImage | I_ObjectCode)[] = [];
  constructor(props: any) {
    super(props);
    let possibleData = localStorage.getItem("createQuestion");
    if (possibleData !== null) {
      let save = JSON.parse(possibleData);
      this.data = save.content;
    } else {
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
        fontFamily: "Arial",
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
  private saveQuestionObject() {
    localStorage.setItem(
      "createQuestion",
      JSON.stringify({
        title1: "",
        title2: "",
        content: this.data,
      })
    );
  }
  private publish() {}
  componentWillUnmount() {
    this.saveQuestionObject();
  }
  render() {
    return (
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography variant="h5">Page content</Typography>
        </Grid>
        {this.data
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
                        rows={4}
                        fullWidth
                        value={item.content}
                        onChange={(event) => {
                          item.content = event.target.value;
                          this.forceUpdate();
                        }}
                      />
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
          })}
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
          <Paper
            elevation={8}
            sx={{ padding: 1 }}
            style={{
              position: "fixed",
              right: "0px",
              bottom: "0px",
            }}
          >
            <Grid container direction="column" spacing={2}>
              <Grid item container justifyContent="flex-end">
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
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

              <Grid item container justifyContent="flex-end">
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button
                    startIcon={<SaveIcon />}
                    onClick={() => {
                      this.saveQuestionObject();
                    }}
                  >
                    quick save
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
