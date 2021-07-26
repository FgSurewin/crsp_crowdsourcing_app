import React from "react";
import asyncLoading from "react-async-loader";
import Label from "./Label";
import { combineMapOptions } from "./utils/mapTools";
import { markersInit } from "./utils/markerTools";
import {
  bindStreetViewEvents,
  combineStreetViewOptions,
} from "./utils/streetViewTools";
import { isEqual } from "lodash";
import {
  MapContainer,
  OriginalMapWrapper,
  Shade,
  SmallMap,
  StreetViewContainer,
  StreetViewWindow,
} from "./style";

const OriginalMap = ({
  mainStyle,
  googleMaps,
  mapOptions,
  streetViewOptions,
  events,
  markers,
  labelMode,
  labels,
  handleStreetViewClick,
}) => {
  const _map = React.useRef();
  const _streetView = React.useRef();
  const _mapOptions = React.useRef();
  const _streetViewOptions = React.useRef();
  const [map, setMap] = React.useState(null);
  const [streetView, setStreetView] = React.useState(null);

  React.useEffect(() => {
    // console.log("test googleMaps -> ", googleMaps);
    // First initialization
    if (streetView === null && map === null && googleMaps) {
      // console.log("Initialize......");
      _mapOptions.current = mapOptions;
      _streetViewOptions.current = streetViewOptions;
      setMap(new googleMaps.Map(_map.current, combineMapOptions(mapOptions)));
      setStreetView(
        new googleMaps.StreetViewPanorama(
          _streetView.current,
          combineStreetViewOptions(streetViewOptions)
        )
      );
    }

    // Binding events
    if (
      streetView !== null &&
      map !== null &&
      isEqual(_mapOptions.current, mapOptions) &&
      isEqual(_streetViewOptions.current, streetViewOptions)
    ) {
      // console.log("Binding events....");
      map.setStreetView(streetView);
      bindStreetViewEvents(streetView, events, map);
      markersInit(googleMaps, markers, map);
    }

    // Update street view
    if (
      streetView !== null &&
      map !== null &&
      !isEqual(_mapOptions.current, mapOptions) &&
      !isEqual(_streetViewOptions.current, streetViewOptions)
    ) {
      // console.log("Initialize Again......");
      _mapOptions.current = mapOptions;
      _streetViewOptions.current = streetViewOptions;
      setMap(new googleMaps.Map(_map.current, combineMapOptions(mapOptions)));
      setStreetView(
        new googleMaps.StreetViewPanorama(
          _streetView.current,
          combineStreetViewOptions(streetViewOptions)
        )
      );
    }
    return () => {
      if (map) {
        googleMaps.event.clearInstanceListeners(map);
      }
    };
  }, [
    map,
    streetView,
    googleMaps,
    mapOptions,
    streetViewOptions,
    events,
    markers,
  ]);

  return (
    <OriginalMapWrapper id="originalMap">
      <StreetViewContainer
        className="streetViewContainer"
        style={mainStyle}
        onClick={handleStreetViewClick}
      >
        {labels &&
          labels.length > 0 &&
          labels.map(({ id, color, position, display }) => (
            <Label
              key={id}
              labelStyle={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                backgroundColor: color,
                display,
              }}
            />
          ))}
        {labelMode && <div className="labelPanel"></div>}
        <StreetViewWindow id="streetView" ref={_streetView} />
      </StreetViewContainer>
      <MapContainer className="mapContainer">
        <Shade className="shade" />
        <SmallMap id="map" ref={_map} />
      </MapContainer>
    </OriginalMapWrapper>
  );
};

const mapScriptsToProps = ({ api }) => ({
  googleMaps: {
    globalPath: "google.maps",
    url: `https://maps.googleapis.com/maps/api/js?key=${api}&v=weekly`,
    jsonp: true,
  },
});

export default asyncLoading(mapScriptsToProps)(OriginalMap);
