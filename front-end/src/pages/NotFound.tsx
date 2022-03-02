import { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
  render() {
    return (
      <div>
        Error 404: Panel not found. (Redirect to <Link to={"/"}>HOME</Link>)
      </div>
    );
  }
}
