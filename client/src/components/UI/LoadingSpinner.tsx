import React, { FC } from "react";
import { Spinner } from "react-bootstrap";

interface ILoadingSpinnerProps {}

export const LoadingSpinner: FC<ILoadingSpinnerProps> = () => {
  return (
    <>
      <Spinner animation="border" role="status" className="loading-spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <br />
    </>
  );
};

export default LoadingSpinner;
