import { Fab, Grid, Paper, Skeleton, Typography } from "@mui/material";
import React, { Component } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default class ListItem extends Component<{
  data: {
    title?: string;
    date?: string;
    email?: string;
    description?: string;
    path?: string;
    hidden?: boolean;
  };
}> {
  render() {
    return (
      <Paper elevation={10} sx={{ padding: "5px" }}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={"auto"}>
            {this.props.data.title ? (
              <Typography variant="h6">{this.props.data.title}</Typography>
            ) : (
              <Skeleton variant="text" width={300} height={48} />
            )}
          </Grid>
          <Grid item>
            {this.props.data.date ? (
              <Typography>{this.props.data.date}</Typography>
            ) : (
              <Skeleton variant="text" width={130} height={24} />
            )}
          </Grid>
        </Grid>

        {this.props.data.description ? (
          <Typography>{this.props.data.description}</Typography>
        ) : (
          <>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" width={"80%"} />
          </>
        )}
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item xs={"auto"}>
            {this.props.data.email ? (
              <Typography>By {this.props.data.email}</Typography>
            ) : (
              <Skeleton variant="text" width={140} />
            )}
          </Grid>
          <Grid item xs={"auto"}>
            {this.props.data.path ? (
              <Fab size="medium" href={this.props.data.path}>
                <PlayArrowIcon />
              </Fab>
            ) : (
              <Skeleton variant="circular" height={48} width={48} />
            )}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
