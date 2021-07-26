import React from "react";
import Home from "./views/Home";
import styled from "styled-components";
import Exploration from "./views/Exploration";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import LabelPage from "./views/LabelPage";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN } from "./redux/actionTypes";
import { ID, NICKNAME, readLocal, TOKEN } from "./utils/localStorage";
import "antd/dist/antd.css";

const AppWrapper = styled.div`
  overflow-x: hidden;
`;

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const id = readLocal(ID);
    const token = readLocal(TOKEN);
    const nickname = readLocal(NICKNAME);
    dispatch({ type: LOGIN, payload: { id, token, nickname } });
  }, [dispatch]);

  return (
    <AppWrapper>
      <Switch>
        <ProtectedRoute component={Exploration} path="/streetView" />
        <ProtectedRoute component={LabelPage} path="/validation/:id" />
        <Route component={Home} path="/home" />
        <Route component={SignUp} path="/signUp" />
        <Route component={Login} path="/login" />
        <Redirect exact from="/" to="/home" />
      </Switch>
    </AppWrapper>
  );
}

export default App;
