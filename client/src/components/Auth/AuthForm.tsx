import React, { FC, useEffect, useState } from "react";
import { Form, Row, Button, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../hooks/redux";

import { setUser } from "../../store/auth";
import { Form as FinalForm, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { useAuthenticateMutation } from "../../services/auth";
import ErrorText from "../UI/ErrorText";
import LoadingSpinner from "../UI/LoadingSpinner";
import { errorHelper } from "../../helpers/errorHelper";

interface IAuthFormProps {}

export const AuthForm: FC<IAuthFormProps> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((prev) => !prev);

  const [signin, { data, isLoading, error, isError, isSuccess }] =
    useAuthenticateMutation();

  useEffect(() => {
    if (isSuccess) {
      if (isLoginMode) {
        dispatch(
          setUser({
            username: data.email,
            role: data.role,
            token: data.accessToken,
          })
        );
        navigate("/products");
      } else {
        toggleModal();
        setIsLoginMode(true);
      }
    }
  }, [isSuccess, dispatch, data, navigate]);

  let errorMessage = errorHelper(isError, error);

  const switchAuthModeHandler = () => {
    setIsLoginMode((prevState) => !prevState);
  };

  const onSubmit = (e: any) => {
    signin({ isLoginMode, email: e.email, password: e.password });
  };

  return (
    <>
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your account has been successfully created. Now you can login.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <h1>{isLoginMode ? "Login" : "Registration"}</h1>
      <FinalForm
        onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="form">
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>

              <Field
                name="email"
                render={({ input }) => {
                  return (
                    <Form.Control
                      {...input}
                      type="email"
                      placeholder="Enter email"
                      required
                    />
                  );
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Field
                name="password"
                render={({ input }) => {
                  return (
                    <Form.Control
                      {...input}
                      type="password"
                      placeholder="Enter password"
                      minLength={4}
                      maxLength={40}
                      required
                    />
                  );
                }}
              />
            </Form.Group>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            {isLoading && <LoadingSpinner />}
            <Row>
              <Button variant="primary" type="submit">
                {isLoginMode ? "Login" : "Create Account"}
              </Button>
            </Row>
            or
            <Row>
              <Button variant="secondary" onClick={switchAuthModeHandler}>
                {isLoginMode
                  ? "Create new account"
                  : "Login with existing account"}
              </Button>
            </Row>
          </Form>
        )}
      />
    </>
  );
};
