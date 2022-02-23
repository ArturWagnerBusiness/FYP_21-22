import { Component } from "react";

export default class Login extends Component {
  fakeLogin = () => {};
  render() {
    return (
      <div>
        Login <button onClick={this.fakeLogin}></button>
      </div>
    );
  }
}
