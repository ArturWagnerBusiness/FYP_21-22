import { Button } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  content: string;
  path: string;
  disabled?: boolean;
  fullWidth?: boolean | undefined;
  variant?: "text" | "outlined" | "contained" | undefined;
}

const S_LinkButton: React.CSSProperties = {
  textDecoration: "none",
  padding: "3px",
};
export default class LinkButton extends Component<LinkButtonProps> {
  case = (props: any) => {
    return this.props.disabled ? (
      <a style={S_LinkButton}>{props.children}</a>
    ) : (
      <Link style={S_LinkButton} to={this.props.path}>
        {props.children}
      </Link>
    );
  };
  render() {
    return (
      <this.case>
        <Button
          variant={this.props.variant}
          size="large"
          disabled={this.props.disabled}
          fullWidth={this.props.fullWidth}
        >
          {this.props.content}
        </Button>
      </this.case>
    );
  }
}
