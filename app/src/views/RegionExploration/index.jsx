import React from "react";
import asyncLoading from "react-async-loader";
import { Spin } from "antd";
import { LoadingEffectContainer } from "./style";
import { Route, Switch, Redirect } from "react-router-dom";
import RegionMap from "../../components/RegionMap";
import RegionStreetView from "../CaptureExploration/RegionStreetView";

const LoadingEffect = (
  <LoadingEffectContainer>
    <Spin size="large"></Spin>
  </LoadingEffectContainer>
);

function RegionExploration({ googleMaps }) {
  return (
    <>
      {googleMaps ? (
        <div>
          <Switch>
            <Route
              render={(props) => (
                <RegionMap googleMaps={googleMaps} {...props} />
              )}
              path="/streetView/regionMap"
            />
            <Route
              render={(props) => (
                <RegionStreetView googleMaps={googleMaps} {...props} />
              )}
              path="/streetView/regionStreetView"
            />
            <Redirect from="/streetView" to="/streetView/regionMap" />
          </Switch>
        </div>
      ) : (
        LoadingEffect
      )}
    </>
  );
}

const mapScriptsToProps = ({ api }) => ({
  googleMaps: {
    globalPath: "google.maps",
    url: `https://maps.googleapis.com/maps/api/js?key=${api}&libraries=&v=weekly&channel=2&libraries=places`,
    jsonp: true,
  },
});

export default asyncLoading(mapScriptsToProps)(RegionExploration);
