import { Button } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  content: string;
  path: string;
}

const S_LinkButton: React.CSSProperties = {
  textDecoration: "none",
};
export default class LinkButton extends Component<LinkButtonProps> {
  render() {
    return (
      <Link style={S_LinkButton} to={this.props.path}>
        <Button>{this.props.content}</Button>
      </Link>
    );
  }
}
