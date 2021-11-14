import React from "react";
import Home from "./views/Home";
import styled from "styled-components";
// import Exploration from "./views/Exploration";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
// import LabelPage from "./views/LabelPage";
import PureValidation from "./views/LabelPage/PureValidation";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN } from "./redux/actionTypes";
import { ID, NICKNAME, readLocal, TOKEN } from "./utils/localStorage";
import "antd/dist/antd.css";
import CapturePage from "./views/CapturePage";
import CaptureLabelPage from "./views/CaptureLabelPage";
// import CaptureExploration from "./views/CaptureExploration";
import EditCaptureLabelPage from "./views/CaptureLabelPage/EditCaptureLabelPage";
import NotFound from "./views/NotFound";
// import RegionExploration from "./views/RegionExploration";
import FixStreetView from "./views/CaptureExploration/FixStreetView";

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
        {/* <ProtectedRoute
          component={RegionExploration}
          path="/streetView"
          api={process.env.REACT_APP_API_KEY}
        /> */}
        <ProtectedRoute component={FixStreetView} path="/streetView" />
        {/* <ProtectedRoute component={CaptureExploration} path="/streetView" /> */}
        {/* <ProtectedRoute component={LabelPage} path="/validation/:id" /> */}
        <ProtectedRoute component={PureValidation} path="/pureValidation" />
        <ProtectedRoute component={CapturePage} path="/captureImage" />
        <ProtectedRoute component={CaptureLabelPage} path="/captureLabelPage" />
        <ProtectedRoute
          component={EditCaptureLabelPage}
          path="/editCaptureLabelPage/:id"
        />
        <Route exact component={Home} path="/home" />
        <Route exact component={SignUp} path="/signUp" />
        <Route exact component={Login} path="/login" />
        <Route exact component={NotFound} path="/404" />
        <Redirect exact from="/" to="/home" />
        <Redirect to="/404" />
      </Switch>
    </AppWrapper>
  );
}

export default App;
