import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
  render() {
    return (
      <div>
        Error 404: Page not found. (You can go to <Link to={"/"}>home</Link>)
      </div>
    );
  }
}
