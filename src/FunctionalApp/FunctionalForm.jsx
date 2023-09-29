import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "./FunctionalTextInput";
import {
  isCityValid,
  isEmailValid,
  isNameValid,
  isPhoneValid,
} from "../utils/validations";
import { allCities } from "../../../lord-of-the-forms-js-1/src/utils/all-cities";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";

const invalidMessages = {
  firstName: "First name must be at least 2 characters long",
  lastName: "Last name must be at least 2 characters long",
  email: "Email is Invalid",
  city: "State is Invalid",
  phone: "Invalid Phone Number",
};

export const FunctionalForm = ({ setUserData }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userDataInput, setUserDataInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: ["", "", "", ""],
  });
  const validityTracker = {
    firstName: isNameValid(userDataInput.firstName),
    lastName: isNameValid(userDataInput.lastName),
    email: isEmailValid(userDataInput.email),
    city: isCityValid(allCities, userDataInput.city),
    phone: isPhoneValid(userDataInput.phone),
  };

  const clearInputs = () => {
    setUserDataInput({
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      phone: ["", "", "", ""],
    });
  };

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setUserDataInput((prevUserDataInput) => ({
      ...prevUserDataInput,
      [id]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!isAllValid(validityTracker)) {
      alert("bad data input");
      return;
    }
    setUserData(userDataInput);
    clearInputs();
    setIsSubmitted(false);
  };

  const isAllValid = (validationObject) =>
    Object.values(validationObject).every(Boolean);

  return (
    <form onSubmit={handleOnSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalTextInput
        labelText={"First Name"}
        inputProps={{
          id: "firstName",
          placeholder: "Baggins",
          value: userDataInput.firstName,
          onChange: handleOnChange,
        }}
      />
      <ErrorMessage
        message={invalidMessages.firstName}
        show={!validityTracker.firstName && isSubmitted}
      />

      {/* last name input */}
      <FunctionalTextInput
        labelText={"Last Name"}
        inputProps={{
          id: "lastName",
          placeholder: "Baggins",
          value: userDataInput.lastName,
          onChange: handleOnChange,
        }}
      />
      <ErrorMessage
        message={invalidMessages.lastName}
        show={!validityTracker.lastName && isSubmitted}
      />

      {/* Email Input */}
      <FunctionalTextInput
        labelText={"Email"}
        inputProps={{
          id: "email",
          placeholder: "bilbo-baggins@adventurehobbits.net",
          value: userDataInput.email,
          onChange: handleOnChange,
        }}
      />
      <ErrorMessage
        message={invalidMessages.email}
        show={!validityTracker.email && isSubmitted}
      />

      {/* City Input */}
      <FunctionalTextInput
        labelText={"City"}
        inputProps={{
          id: "city",
          list: "cities",
          placeholder: "Hobbiton",
          value: userDataInput.city,
          onChange: handleOnChange,
        }}
      />
      <ErrorMessage
        message={invalidMessages.city}
        show={!validityTracker.city && isSubmitted}
      />
      {/* Phone Input */}
      <FunctionalPhoneInput
        onChange={(newPhoneInput) =>
          setUserDataInput({
            ...userDataInput,
            phone: newPhoneInput,
          })
        }
      />
      <ErrorMessage
        message={invalidMessages.phone}
        show={!validityTracker.phone && isSubmitted}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
