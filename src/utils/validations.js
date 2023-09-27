export function isEmailValid(emailAddress) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isNameValid(name) {
  return name.length > 1;
}

export function isCityValid(arrayA, city) {
  // Convert the input string and array elements to lowercase for case-insensitive comparison
  const lowercasedCity = city.toLowerCase();
  const lowercasedArray = arrayA.map((item) => item.toLowerCase());

  // Check if the lowercased input string is included in the lowercased array
  return lowercasedArray.includes(lowercasedCity);
}

export function isPhoneValid(arr) {
  // Check if the array has exactly 4 elements
  if (arr.length !== 4) {
    return false;
  }

  // Check the first three elements for having exactly 2 numeric characters
  for (let i = 0; i < 3; i++) {
    if (!/^\d{2}$/.test(arr[i])) {
      return false;
    }
  }

  // Check the fourth element for having exactly 1 numeric character
  if (!/^\d{1}$/.test(arr[3])) {
    return false;
  }

  // If all checks pass, the array is valid
  return true;
}
