import React, { FC } from "react";
import "./ErrorText.css";

interface IErrorTextProps {
  children?: any;
}

export const ErrorText: FC<IErrorTextProps> = (props) => {
  return (
    <div className="general-error-text">
      <p>{props.children ? props.children : "error occured"}</p>
    </div>
  );
};

export default ErrorText;
