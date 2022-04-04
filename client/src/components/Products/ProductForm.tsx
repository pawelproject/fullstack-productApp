import React, { FC } from "react";
import { Form, Button } from "react-bootstrap";

import { Form as FinalForm, Field } from "react-final-form";

import ErrorText from "../UI/ErrorText";
import LoadingSpinner from "../UI/LoadingSpinner";

interface IProductFormProps {
  initialValues?: {
    title: string;
    description: string;
  };
  onSubmit: any;
  errorMessage: string;
  isLoading: boolean;
  clearInputs?: any;
}

export const ProductForm: FC<IProductFormProps> = ({
  onSubmit,
  initialValues = {
    title: "",
    description: "",
  },
  errorMessage,
  isLoading,
}) => {
  const submitHandler = (e: any) => {
    onSubmit(e);
  };

  return (
    <>
      <FinalForm
        onSubmit={submitHandler}
        // validate={validate}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="form">
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Product Name</Form.Label>

              <Field
                name="title"
                defaultValue={initialValues.title}
                render={({ input }) => {
                  return (
                    <Form.Control
                      {...input}
                      type="text"
                      minLength={4}
                      maxLength={40}
                      required
                    />
                  );
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Description</Form.Label>

              <Field
                name="description"
                defaultValue={initialValues.description}
                render={({ input }) => {
                  return (
                    <Form.Control
                      {...input}
                      as="textarea"
                      minLength={20}
                      maxLength={500}
                      rows={5}
                      required
                    />
                  );
                }}
              />
            </Form.Group>

            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

            {isLoading && <LoadingSpinner />}

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      />
    </>
  );
};
