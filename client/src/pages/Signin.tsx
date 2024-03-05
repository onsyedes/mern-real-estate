import React from "react";
import { useLocation } from "react-router-dom";

const Signin = () => {
  const { state } = useLocation();
  const { message } = state;
  if (message) console.log(message);
  return <div>Signin</div>;
};

export default Signin;
