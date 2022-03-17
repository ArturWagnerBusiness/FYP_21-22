import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Component } from "react";
import ListItem from "../../components/ListItem";
import SearchIcon from "@mui/icons-material/Search";
import { ListItemProps } from "../../components/ListItem.interface";

export default class List extends Component<
  {},
  {
    page: number;
    pageCount: number;
    search: string;
    searchBox: string;
    order: string;
  }
> {
  state = {
    page: 1,
    pageCount: 1,
    search: "",
    searchBox: "",
    order: "recent",
  };
  data: ListItemProps["data"][] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  componentDidMount() {
    this.renderPage(1);
  }
  updatePageCounter(next: Function) {
    axios({
      method: "post",
      url: "/api/exercises/count/",
      data: {
        search: this.state.search,
      },
    })
      .then((response) => {
        console.log(response);
        let pages = parseInt(response.data.length);
        let max = Math.ceil(pages / 10);
        console.info(`Rendering pages ${this.state.page}/${max} (${pages})`);
        if (this.state.page > max) {
          this.setState({
            page: Math.max(max, 1),
            pageCount: max,
          });
        } else {
          this.setState((state, props) => ({
            page: Math.max(state.page, 1),
            pageCount: max,
          }));
        }
        console.info("Page count obtained!");
        next();
      })
      .catch((error) => {
        console.warn("Failed to get page count");
      });
  }
  renderPage(page: number) {
    this.updatePageCounter(() => {
      this.data = [
        /*{
          title: "No title",
          date: new Date(Date.now()).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          email: "k1909979",
          description: "Some sick text might go here",
          path: `https://www.nooblab.com/NoobLab/contents/${window.location.hostname}/api/exercises/1`,
          hidden: false,
          likes: 10,
        },*/ {}, // Replace this one with the one on top for testing.
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ];

      let request = {
        page: this.state.page,
        order: this.state.order,
        search: this.state.search,
      };
      axios({
        method: "post",
        url: "/api/exercises/content/",
        data: request,
      })
        .then((response) => {
          if (page === this.state.page && typeof response.data === "object") {
            let x = 0;
            console.log(response.data);
            response.data.forEach((item: any) => {
              let data = JSON.parse(item.data);
              this.data[x] = {
                title: data?.title ? data?.title : "No title",
                date: new Date(item.date_added).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }),
                email: item?.email ? item?.email : "No Email",
                description: data?.description
                  ? data?.description
                  : "No description",
                path: `https://www.nooblab.com/NoobLab/contents/${window.location.hostname}/api/exercises/${item.id}`,
                hidden: false,
                likes: item?.likes ? parseInt(item?.likes) : 0,
              };

              x++;
            });
            while (x < 10) {
              this.data[x] = { hidden: true };
              x++;
            }
          }
          console.info("Exercises obtained!");
          this.forceUpdate();
        })
        .catch((error) => {
          console.warn("Failed to get list of exercises");
          this.forceUpdate();
          //console.warn(error);
        });
      this.forceUpdate();
    });
  }
  render() {
    return (
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} container alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={10} sx={{ padding: "5px" }}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12} container spacing={1}>
                  <Grid item xs={10}>
                    <TextField
                      variant="standard"
                      fullWidth
                      placeholder="Find your exercise!"
                      onChange={(event) => {
                        this.setState({ searchBox: event.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      startIcon={<SearchIcon />}
                      onClick={() => {
                        this.setState(
                          (state, props) => ({
                            search: state.searchBox,
                          }),
                          () => {
                            this.renderPage(this.state.page);
                          }
                        );
                      }}
                      fullWidth
                      variant="outlined"
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel>Order by</FormLabel>
                    <RadioGroup
                      row
                      defaultValue="recent"
                      onChange={(event) => {
                        this.setState({ order: event.target.value }, () => {
                          this.renderPage(this.state.page);
                        });
                        console.info("Clicked on order: " + event.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="recent"
                        control={<Radio />}
                        label="Recent"
                      />
                      <FormControlLabel
                        value="liked"
                        control={<Radio />}
                        label="Most Liked"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        {this.data.map((x) => {
          if (x?.hidden !== true) {
            return (
              <Grid item xs={6}>
                <ListItem data={x} />
              </Grid>
            );
          }
        })}
        <Grid item xs={12} container direction="column" alignItems="center">
          <Pagination
            count={this.state.pageCount}
            page={this.state.page}
            onChange={(event, value) => {
              this.setState({ page: value }, () => {
                this.renderPage(this.state.page);
              });
            }}
          />
        </Grid>
      </Grid>
    );
  }
}
