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
  const isValid = {
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

  const handleOnChangePhone = (e) => {
    const { id, value } = e.target;
    let newValue = value.replace(/[^0-9]/g, "");
    const phoneIndex = parseInt(id[id.length - 1]) - 1;
    const maxLength = phoneIndex === 3 ? 1 : 2;
    let truncatedValue = newValue.slice(0, maxLength);

    setUserDataInput((prevUserDataInput) => ({
      ...prevUserDataInput,
      phone: prevUserDataInput.phone.map((phoneValue, index) =>
        index === phoneIndex ? truncatedValue : phoneValue
      ),
    }));
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
    if (isAllValid(isValid)) {
      setUserData(userDataInput);
      clearInputs();
      setIsSubmitted(false);
    } else {
      alert("bad data input");
    }
  };

  function isAllValid(validationObject) {
    // Extract all the values from the validationObject
    const values = Object.values(validationObject);

    // Check if all values are true
    return values.every((value) => value === true);
  }

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
        show={!isValid.firstName && isSubmitted}
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
        show={!isValid.lastName && isSubmitted}
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
        show={!isValid.email && isSubmitted}
      />

      {/* City Input */}
      <FunctionalTextInput
        labelText={"City"}
        inputProps={{
          id: "city",
          list: "suggestions",
          placeholder: "Hobbiton",
          value: userDataInput.city,
          onChange: handleOnChange,
        }}
        datalistOptions={allCities}
      />
      <ErrorMessage
        message={invalidMessages.city}
        show={!isValid.city && isSubmitted}
      />
      {/* Phone Input */}
      <FunctionalPhoneInput
        value={userDataInput.phone}
        onChange={handleOnChangePhone}
      />
      <ErrorMessage
        message={invalidMessages.phone}
        show={!isValid.phone && isSubmitted}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
