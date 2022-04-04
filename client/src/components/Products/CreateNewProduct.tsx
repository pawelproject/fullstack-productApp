import React, { FC, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../services/products";

import { ProductForm } from "./ProductForm";
import { errorHelper } from "../../helpers/errorHelper";

interface ICreateNewProductProps {}

export const CreateNewProduct: FC<ICreateNewProductProps> = (props) => {
  const navigate = useNavigate();

  const [createProduct, { isLoading, error, isError, isSuccess }] =
    useCreateProductMutation();

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((prev) => !prev);

  let errorMessage = errorHelper(isError, error);

  useEffect(() => {
    if (isSuccess) {
      toggleModal();
    }
  }, [isSuccess]);

  const onSubmit = (e: any) => {
    createProduct({
      title: e.title,
      description: e.description,
    });
  };

  return (
    <>
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>New product has been successfully added.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/products");
            }}
          >
            Go back to product list
          </Button>
          <Button variant="primary" onClick={toggleModal}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
      <ProductForm
        onSubmit={onSubmit}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
    </>
  );
};
