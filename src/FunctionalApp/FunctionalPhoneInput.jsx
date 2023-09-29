import React, { useRef, useState } from "react";

export function FunctionalPhoneInput({ value, onChange }) {
  const phoneInputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [phoneNumber, setPhoneNumber] = useState(["", "", "", ""]);

  const handleOnChange = (e, index) => {
    const { value } = e.target;
    let newValue = value.replace(/[^0-9]/g, "");
    const maxLength = index === 3 ? 1 : 2;
    let truncatedValue = newValue.slice(0, maxLength);

    setPhoneNumber((prevPhoneNumber) => {
      const updatedPhoneNumber = [...prevPhoneNumber]; // Create a copy of the current state
      updatedPhoneNumber[index] = truncatedValue; // Set the new value at the specified index
      console.log(updatedPhoneNumber);
      onChange(updatedPhoneNumber);
      return updatedPhoneNumber; // Return the updated state
    });

    if (truncatedValue.length === maxLength && index < 3) {
      phoneInputRefs[index + 1].current.focus();
    }
    if (truncatedValue.length === 0 && index > 0) {
      phoneInputRefs[index - 1].current.focus();
    }
  };

  const renderPhoneInputs = () => {
    const placeholders = ["55", "55", "55", "5"];

    return placeholders.map((placeholder, index) => (
      <React.Fragment key={index}>
        <input
          type="text"
          id={`phone-input-${index + 1}`}
          placeholder={placeholder}
          value={phoneNumber[index]}
          onChange={(e) => handleOnChange(e, index)}
          ref={phoneInputRefs[index]}
        />
        {index < 3 && <span>-</span>}
      </React.Fragment>
    ));
  };

  return (
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">{renderPhoneInputs()}</div>
    </div>
  );
}
