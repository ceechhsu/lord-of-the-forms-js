import React, { Component, createRef } from "react";

class ClassPhoneInput extends Component {
  state = {
    phoneNumber: ["", "", "", ""],
  };

  phoneInputRefs = [createRef(), createRef(), createRef(), createRef()];

  handleOnChange = (e, index) => {
    let newValue = e.target.value.replace(/[^0-9]/g, "");
    const maxLength = index === 3 ? 1 : 2;
    let truncatedValue = newValue.slice(0, maxLength);

    this.setState((prevPhoneNumber) => {
      const updatedPhoneNumber = [...prevPhoneNumber.phoneNumber]; // Create a copy of the current state
      updatedPhoneNumber[index] = truncatedValue; // Set the new value at the specified index
      this.props.onChange(updatedPhoneNumber);
      return { phoneNumber: updatedPhoneNumber }; // Return the updated state
    });

    if (truncatedValue.length === maxLength && index < 3) {
      this.phoneInputRefs[index + 1].current.focus();
    }
    if (truncatedValue.length === 0 && index > 0) {
      this.phoneInputRefs[index - 1].current.focus();
    }
  };

  renderPhoneInputs = () => {
    const placeholders = ["55", "55", "55", "5"];

    return placeholders.map((placeholder, index) => (
      <React.Fragment key={index}>
        <input
          type="text"
          id={`phone-input-${index + 1}`}
          placeholder={placeholder}
          value={this.state.phoneNumber[index]}
          onChange={(e) => this.handleOnChange(e, index)}
          ref={this.phoneInputRefs[index]}
        />
        {index < 3 && <span>-</span>}
      </React.Fragment>
    ));
  };

  render() {
    return (
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">{this.renderPhoneInputs()}</div>
      </div>
    );
  }
}

export default ClassPhoneInput;
