import { FC, useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";

import { useGetProductsQuery } from "../../services/products";

import productImg from "../../images/product_example.jpg";
import ErrorText from "../UI/ErrorText";
import { Product } from "../../types/Product";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import "./ProductList.css";

interface IProductListProps {}

export const ProductList: FC<IProductListProps> = (props) => {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError } = useGetProductsQuery("");

  const [products, setProducts] = useState<Product[]>([]);
  const userRole = useAppSelector((state) => state.auth.role);

  useEffect(() => {
    if (isSuccess) {
      setProducts(data.products);
    }
  }, [data, isSuccess]);

  return (
    <>
      {isError && <ErrorText />}
      {userRole === "admin" && (
        <>
          <Row>
            <Button
              onClick={() => {
                navigate("create");
              }}
            >
              Create new Product
            </Button>
          </Row>
          <br />
        </>
      )}
      {isLoading && <LoadingSpinner />}

      <Row>
        {products.map((product: Product) => {
          return (
            <Col key={product._id}>
              <Card className="mx-auto" style={{ width: "160px" }}>
                <Card.Body>
                  <Card.Title className="card-title">
                    {product.title}
                  </Card.Title>
                  <Card.Img variant="top" src={productImg} />
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate("" + product._id);
                    }}
                  >
                    See details
                  </Button>
                </Card.Body>
              </Card>
              <br />
            </Col>
          );
        })}
      </Row>
    </>
  );
};
