import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: ["", "", "", ""],
  });

  const isUserDataNotEmpty = Object.values(userData).every((value) => {
    if (Array.isArray(value)) {
      // If the value is an array, check that all elements in the array are not empty strings
      return value.every((item) => item !== "");
    } else {
      // For non-array values, check that the value itself is not an empty string
      return value !== "";
    }
  });
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={isUserDataNotEmpty ? userData : null} />
      <FunctionalForm setUserData={setUserData} />
    </>
  );
};
