import { Button, Grid, Pagination, Paper, Skeleton } from "@mui/material";
import axios from "axios";
import React, { Component } from "react";
import ListItem from "../../components/ListItem";

export default class List extends Component<{}, { page: number }> {
  state = {
    page: 1,
  };
  data: {
    title?: string;
    date?: string;
    email?: string;
    description?: string;
    path?: string;
    hidden?: boolean;
  }[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  constructor(props: any) {
    super(props);
    this.renderPage(1);
  }
  renderPage(page: number) {
    this.data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    axios({
      method: "get",
      url: "/api/questions/recent/all/" + page,
    })
      .then((response) => {
        if (page === this.state.page && typeof response.data === "object") {
          let x = 0;
          console.log(response.data);
          response.data.forEach((item: any) => {
            console.log("Reading item " + x);
            let data = JSON.parse(item.data);
            this.data[x] = {
              title: data.title ? data.title : "No title",
              date: new Date(item.date_added).toLocaleString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
              email: item.email,
              description: data?.description
                ? data?.description
                : "No description",
              path: `https://www.nooblab.com/NoobLab/contents/${window.location.hostname}/api/questions/${item.id}`,
              hidden: false,
            };

            x++;
          });
          while (x < 10) {
            this.data[x] = { hidden: true };
            x++;
          }
        }
        this.forceUpdate();
      })
      .catch(function (error) {
        console.log(error);
      });
    this.forceUpdate();
  }
  render() {
    return (
      <Grid container direction="row" spacing={2}>
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
            count={10}
            page={this.state.page}
            onChange={(event, value) => {
              this.setState({ page: value });
              this.renderPage(value);
            }}
          />
        </Grid>
      </Grid>
    );
  }
}
