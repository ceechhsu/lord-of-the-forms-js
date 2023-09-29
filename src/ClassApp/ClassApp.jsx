import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

export class ClassApp extends Component {
  state = {
    userData: null,
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={this.state.userData} />
        <ClassForm
          setUserData={(newData) => this.setState({ userData: newData })}
        />
      </>
    );
  }
}
