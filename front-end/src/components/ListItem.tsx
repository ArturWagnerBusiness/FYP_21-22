import { Button, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { Component } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ListItemProps } from "./ListItem.interface";

export default class ListItem extends Component<ListItemProps> {
  render() {
    return (
      <Paper elevation={10} sx={{ padding: "5px" }}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={"auto"}>
            {this.props.data.title ? (
              <Typography variant="h6">
                {this.props.data.title}{" "}
                {this.props.data.likes ? `(+${this.props.data.likes})` : `(0)`}
              </Typography>
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
              <Typography>By {this.props.data.email.toUpperCase()}</Typography>
            ) : (
              <Skeleton variant="text" width={140} />
            )}
          </Grid>
          <Grid item xs={"auto"}>
            <br />
            {this.props.data.path ? (
              <Button
                variant="outlined"
                endIcon={<OpenInNewIcon />}
                href={this.props.data.path}
                target="_blank"
              >
                Start Exercise
              </Button>
            ) : (
              <Skeleton
                variant="rectangular"
                height={45}
                width={200}
                sx={{ borderRadius: "5px" }}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
