import { Component } from "react";

export class ClassTextInput extends Component {
  render() {
    const { labelText, inputProps, datalistOptions } = this.props;
    return (
      <div className="input-wrap">
        <label htmlFor={inputProps.id}>{labelText}:</label>
        <input type="text" {...inputProps} />
        {inputProps.list && (
          <datalist id={inputProps.list}>
            {datalistOptions.map((option, index) => (
              <option key={index} value={option} />
            ))}
          </datalist>
        )}
      </div>
    );
  }
}

///

//   export function FunctionalTextInput({
//     labelText,
//     inputProps,
//     datalistOptions,
//   }) {
//     return (
//       <div className="input-wrap">
//         <label htmlFor={inputProps.id}>{labelText}:</label>
//         <input type="text" {...inputProps} />
//         {inputProps.list && (
//           <datalist id={inputProps.list}>
//             {datalistOptions.map((option, index) => (
//               <option key={index} value={option} />
//             ))}
//           </datalist>
//         )}
//       </div>
//     );
//   }
