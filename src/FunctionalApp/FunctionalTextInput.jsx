export function FunctionalTextInput({ labelText, inputProps }) {
  return (
    <div className="input-wrap">
      <label htmlFor={inputProps.id}>{labelText}:</label>
      <input type="text" {...inputProps} />
    </div>
  );
}
