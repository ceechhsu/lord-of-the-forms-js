import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import {
  isCityValid,
  isEmailValid,
  isNameValid,
  isPhoneValid,
} from "../utils/validations";
import { allCities } from "../../../lord-of-the-forms-js-1/src/utils/all-cities";
import ClassPhoneInput from "./ClassPhoneInput";
import { ClassTextInput } from "./ClassTextInput";

const invalidMessages = {
  firstName: "First name must be at least 2 characters long",
  lastName: "Last name must be at least 2 characters long",
  email: "Email is Invalid",
  city: "State is Invalid",
  phone: "Invalid Phone Number",
};

export class ClassForm extends Component {
  state = {
    isSubmitted: false,
    userDataInput: {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      phone: ["", "", "", ""],
    },
  };

  isAllValid = () => {
    return (
      isNameValid(this.state.userDataInput.firstName) &&
      isNameValid(this.state.userDataInput.lastName) &&
      isEmailValid(this.state.userDataInput.email) &&
      isCityValid(allCities, this.state.userDataInput.city) &&
      isPhoneValid(this.state.userDataInput.phone)
    );
  };

  clearInputs = () => {
    this.setState({
      isSubmitted: false,
      userDataInput: {
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        phone: ["", "", "", ""],
      },
    });
  };

  handleOnChangePhone = (e) => {
    const { id, value } = e.target;
    let newValue = value.replace(/[^0-9]/g, "");
    const phoneIndex = parseInt(id[id.length - 1]) - 1;
    const maxLength = phoneIndex === 3 ? 1 : 2;
    let truncatedValue = newValue.slice(0, maxLength);
    this.setState((prevState) => ({
      userDataInput: {
        ...prevState.userDataInput,
        phone: prevState.userDataInput.phone.map((phoneValue, index) =>
          index === phoneIndex ? truncatedValue : phoneValue
        ),
      },
    }));
  };

  handleOnChange = (e) => {
    const { id, value } = e.target;
    this.setState((prevState) => ({
      userDataInput: {
        ...prevState.userDataInput,
        [id]: value,
      },
    }));
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true });
    const AllValid = this.isAllValid();
    if (AllValid) {
      this.props.setUserData(this.state.userDataInput);
      this.clearInputs();
      this.setState({ isSubmitted: false });
    } else {
      alert("bad data input");
    }
  };

  render() {
    const isValid = {
      firstName: isNameValid(this.state.userDataInput.firstName),
      lastName: isNameValid(this.state.userDataInput.lastName),
      email: isEmailValid(this.state.userDataInput.email),
      city: isCityValid(allCities, this.state.userDataInput.city),
      phone: isPhoneValid(this.state.userDataInput.phone),
    };

    return (
      <form onSubmit={this.handleOnSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <ClassTextInput
          labelText={"First Name"}
          inputProps={{
            id: "firstName",
            placeholder: "Bilbo",
            value: this.state.userDataInput.firstName,
            onChange: this.handleOnChange,
          }}
        />
        <ErrorMessage
          message={invalidMessages.firstName}
          show={!isValid.firstName && this.state.isSubmitted}
        />

        {/* last name input */}
        <ClassTextInput
          labelText={"Last Name"}
          inputProps={{
            id: "lastName",
            placeholder: "Baggins",
            value: this.state.userDataInput.lastName,
            onChange: this.handleOnChange,
          }}
        />
        <ErrorMessage
          message={invalidMessages.lastName}
          show={!isValid.lastName && this.state.isSubmitted}
        />

        {/* Email Input */}
        <ClassTextInput
          labelText={"Email"}
          inputProps={{
            id: "email",
            placeholder: "bilbo-baggins@adventurehobbits.net",
            value: this.state.userDataInput.email,
            onChange: this.handleOnChange,
          }}
        />
        <ErrorMessage
          message={invalidMessages.email}
          show={!isValid.email && this.state.isSubmitted}
        />

        {/* City Input */}
        <ClassTextInput
          labelText={"City"}
          inputProps={{
            id: "city",
            list: "suggestions",
            placeholder: "Hobbiton",
            value: this.state.userDataInput.city,
            onChange: this.handleOnChange,
          }}
          datalistOptions={allCities}
        />
        <ErrorMessage
          message={invalidMessages.city}
          show={!isValid.city && this.state.isSubmitted}
        />

        {/* Phone Input */}
        <ClassPhoneInput
          value={this.state.userDataInput.phone}
          onChange={this.handleOnChangePhone}
        />
        <ErrorMessage
          message={invalidMessages.phone}
          show={!isValid.phone && this.state.isSubmitted}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
