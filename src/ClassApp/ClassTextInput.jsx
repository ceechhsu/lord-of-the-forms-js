import { Component } from "react";

export class ClassTextInput extends Component {
  render() {
    const { labelText, inputProps } = this.props;
    return (
      <div className="input-wrap">
        <label htmlFor={inputProps.id}>{labelText}:</label>
        <input type="text" {...inputProps} />
      </div>
    );
  }
}
