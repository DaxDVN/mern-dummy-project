import React from "react";
import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  let errorMessage = "Something went wrong.";

  if (location.pathname === "/404") {
    errorMessage =
      "404 - Page Not Found: The page you're looking for does not exist.";
  } else if (location.pathname === "/500") {
    errorMessage =
      "500 - Internal Server Error: Something went wrong on our side.";
  } else if (location.pathname === "/400") {
    errorMessage =
      "400 - Bad Request: The request could not be understood or was missing required parameters.";
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{errorMessage}</h1>
      <p>We're sorry for the inconvenience.</p>
    </div>
  );
};

export default ErrorPage;
