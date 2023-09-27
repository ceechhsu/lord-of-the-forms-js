export const capitalize = (inputString) => {
  // todo: build this function
  // `capitalize("jOn")` should output `"Jon"`
  if (!inputString) {
    return inputString;
  }

  return (
    inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
  );
};

export const formatPhoneNumber = (phone) => {
  // todo: build this function
  // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`
  return Array.isArray(phone) ? phone.join("-") : "Not an array";
};
