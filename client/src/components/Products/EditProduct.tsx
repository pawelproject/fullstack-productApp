import React, { FC, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import {
  useEditProductMutation,
  useGetProductDetailsQuery,
} from "../../services/products";
import ErrorText from "../UI/ErrorText";
import LoadingSpinner from "../UI/LoadingSpinner";
import { ProductForm } from "./ProductForm";
import { Product } from "../../types/Product";
import { errorHelper } from "../../helpers/errorHelper";

interface IEditProductProps {}

export const EditProduct: FC<IEditProductProps> = (props) => {
  const params = useParams();
  const productId: string = params.id ? params.id : "";
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | undefined>();
  const [showModal, setShowModal] = useState(false);

  const getProduct = useGetProductDetailsQuery(productId);

  const [editProduct, { isLoading, error, isError, isSuccess }] =
    useEditProductMutation();

  useEffect(() => {
    if (getProduct.isSuccess) {
      setProduct(getProduct.data.products[0]);
    }
  }, [getProduct.data, getProduct.isSuccess]);

  let errorMessage = errorHelper(getProduct.isError, getProduct.error);
  let formErrorMessage = errorHelper(isError, error);

  useEffect(() => {
    if (isSuccess) {
      toggleModal();
    }
  }, [isSuccess]);

  const toggleModal = () => setShowModal((prev) => !prev);

  const onSubmit = (e: any) => {
    editProduct({
      id: productId,
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
        <Modal.Body>Changes has been succesffully saved.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/products");
            }}
          >
            Go back to product list
          </Button>
        </Modal.Footer>
      </Modal>
      {getProduct.isLoading && <LoadingSpinner />}
      {getProduct.isError && <ErrorText>{errorMessage}</ErrorText>}
      {product && (
        <ProductForm
          onSubmit={onSubmit}
          errorMessage={formErrorMessage}
          isLoading={isLoading}
          initialValues={{
            title: product.title,
            description: product.description,
          }}
        />
      )}
    </>
  );
};
