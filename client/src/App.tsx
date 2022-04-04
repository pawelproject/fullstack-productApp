import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";

import "./App.css";
import { AuthForm } from "./components/Auth/AuthForm";
import { CreateNewProduct } from "./components/Products/CreateNewProduct";
import { ProductDetail } from "./components/Products/ProductDetail";
import { ProductList } from "./components/Products/ProduList";
import { useAppDispatch, useAppSelector } from "./hooks/redux";

import TopBar from "./components/UI/TopBar";
import { EditProduct } from "./components/Products/EditProduct";
import { useVerifyTokenMutation } from "./services/auth";
import { clearState, setUser } from "./store/auth";
import LoadingSpinner from "./components/UI/LoadingSpinner";

function App() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = localStorage.getItem("token");

  let enableAutomaticRoute = useRef(!token);

  const [verifyToken, verification] = useVerifyTokenMutation();

  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token, verifyToken]);

  useEffect(() => {
    if (verification.isSuccess) {
      const user = verification.data.user;
      dispatch(
        setUser({
          username: user.email,
          role: user.role,
          token: user.token,
        })
      );
      enableAutomaticRoute.current = true;
    }
  }, [verification.isSuccess, verification.data, dispatch]);

  if (verification.isError) {
    dispatch(clearState());
    enableAutomaticRoute.current = true;
  }

  return (
    <div className="app">
      {verification.isLoading && <LoadingSpinner />}

      <Container>
        <HashRouter>
          {isLoggedIn && <TopBar />}
          <Routes>
            {isLoggedIn && (
              <>
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/products/:id/edit" element={<EditProduct />} />
                <Route path="/products/create" element={<CreateNewProduct />} />
              </>
            )}
            {!isLoggedIn && (
              <>
                <Route path="/auth" element={<AuthForm />} />
              </>
            )}
            {enableAutomaticRoute.current && (
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/products" />
                  ) : (
                    <Navigate to="/auth" />
                  )
                }
              />
            )}
          </Routes>
        </HashRouter>
      </Container>
    </div>
  );
}

export default App;
