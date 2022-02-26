import { Button } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  content: string;
  path: string;
}

const S_LinkButton: React.CSSProperties = {
  textDecoration: "none",
  padding: "3px",
};
export default class LinkButton extends Component<LinkButtonProps> {
  render() {
    return (
      <Link style={S_LinkButton} to={this.props.path}>
        <Button variant="outlined" size="large">
          {this.props.content}
        </Button>
      </Link>
    );
  }
}
