import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

export class ClassApp extends Component {
  state = {
    userData: {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      phone: ["", "", "", ""],
    },
  };

  isUserDataEmpty() {
    return Object.values(this.state.userData).every((value) => {
      if (Array.isArray(value)) {
        // If the value is an array, check that all elements in the array are empty strings
        return value.every((item) => item === "");
      } else {
        // For non-array values, check that the value itself is an empty string
        return value === "";
      }
    });
  }

  render() {
    const emptyUserData = this.isUserDataEmpty();

    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          userData={emptyUserData ? null : this.state.userData}
        />
        <ClassForm
          setUserData={(newData) => this.setState({ userData: newData })}
        />
      </>
    );
  }
}
