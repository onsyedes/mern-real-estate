import React from "react";
type ErrorMessageProps = {
  message: string | undefined;
};
const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <span className="text-red-600 text-sm mt-3">{message}</span>;
};

export default ErrorMessage;
