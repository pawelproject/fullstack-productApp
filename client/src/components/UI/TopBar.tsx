import React from "react";
import { Row, Button, Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearState } from "../../store/auth";
import { GrLogout } from "react-icons/gr";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useAppSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(clearState());
    navigate("/auth");
  };

  return (
    <Row className="user-info">
      <Stack direction="horizontal">
        <div>
          <span>logged as: {auth.username}</span>
        </div>

        <Button className="ms-auto" variant="link" onClick={logoutHandler}>
          <IconContext.Provider value={{ color: "blue", size: "20px" }}>
            <GrLogout onClick={logoutHandler} />
          </IconContext.Provider>
        </Button>
      </Stack>
    </Row>
  );
};

export default TopBar;
