import { FC, useEffect, useState } from "react";
import { Card, Col, Row, Button, Image, Stack, Modal } from "react-bootstrap";

import {
  useDeleteProductMutation,
  useGetProductDetailsQuery,
} from "../../services/products";

import productImg from "../../images/product_example.jpg";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorText from "../UI/ErrorText";
import { Product } from "../../types/Product";
import { errorHelper } from "../../helpers/errorHelper";
import { useAppSelector } from "../../hooks/redux";

interface IProductDetailProps {}

export const ProductDetail: FC<IProductDetailProps> = (props) => {
  const params = useParams();
  const productId: string = params.id ? params.id : "";
  const navigate = useNavigate();
  const userRole = useAppSelector((state) => state.auth.role);

  const { data, error, isLoading, isSuccess, isError } =
    useGetProductDetailsQuery(productId);

  const [deleteProduct, productDeletion] = useDeleteProductMutation();

  const deleteProductHandler = () => {
    deleteProduct(productId);
  };

  const closeModalHandler = () => {
    navigate("/products");
  };

  const [product, setProduct] = useState<Product | undefined>();

  const errorMessage = errorHelper(isError, error);
  const deletionErrorMessage = errorHelper(
    productDeletion.isError,
    productDeletion.error
  );

  useEffect(() => {
    if (isSuccess) {
      setProduct(data.products[0]);
    }
  }, [data, isSuccess]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorText>{errorMessage}</ErrorText>}
      <Modal show={productDeletion.isSuccess} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Product has been successfully deleted.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModalHandler}>
            Go back to product list
          </Button>
        </Modal.Footer>
      </Modal>
      {product && (
        <>
          <Row className="justify-content-md-center">
            <Col>
              <Image src={productImg} />
            </Col>
            <Col>
              <h2>{product.title}</h2>
              <Card.Text>{product.description}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Stack className="col-md-5 mx-auto" gap={3}>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("edit");
                  }}
                >
                  Edit
                </Button>
                {productDeletion.isError && (
                  <ErrorText>{deletionErrorMessage}</ErrorText>
                )}
                {userRole === "admin" && (
                  <Button variant="danger" onClick={deleteProductHandler}>
                    Delete Product
                  </Button>
                )}
              </Stack>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
