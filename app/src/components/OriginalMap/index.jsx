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
  SingleMarkerInnerContainer,
  SingleMarkerInnerWrapper,
  SingleMarkerInnerText,
  SmallMap,
  StreetViewContainer,
  StreetViewWindow,
} from "./style";
import { useSelector, useDispatch } from "react-redux";
import SingleMarker from "./SingleMarker";
import { FILL_STREET_VIEW_SELECT_IMAGE } from "../../redux/reducers/streetView";

const OriginalMap = ({
  mainStyle,
  googleMaps,
  mapOptions,
  streetViewOptions,
  events,
  markers,
  // panoMarkers,
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

  /* ---------------------------------- Redux --------------------------------- */
  const dispatch = useDispatch();
  const { panoMarkers } = useSelector((state) => state.streetView);
  // const [clickList, setClickList] = React.useState(
  //   panoMarkers.map((marker) => ({ id: marker.id, isClick: marker.isClick }))
  // );

  React.useEffect(() => {
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
      _mapOptions.current = mapOptions;
      _streetViewOptions.current = streetViewOptions;
      setMap(new googleMaps.Map(_map.current, combineMapOptions(mapOptions)));
      setStreetView(
        new googleMaps.StreetViewPanorama(
          _streetView.current,
          combineStreetViewOptions(streetViewOptions)
        )
      );
      // if (googleMaps) {
      //   panoMarkers.length > 0 &&
      //     panoMarkerInit(
      //       googleMaps,
      //       panoMarkers,
      //       streetView,
      //       _streetView.current
      //     );
      // }
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
    panoMarkers,
  ]);

  /* ----------------------- Update Street View Markers ----------------------- */
  // React.useEffect(() => {
  //   if (googleMaps) {
  //     panoMarkers.length > 0 &&
  //       panoMarkerInit(
  //         googleMaps,
  //         panoMarkers,
  //         streetView,
  //         _streetView.current
  //       );
  //   }
  // }, [googleMaps, panoMarkers, streetView]);

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
        {googleMaps &&
          streetView &&
          panoMarkers.length > 0 &&
          panoMarkers.map((item) => (
            <SingleMarker
              key={item.id}
              id={item.id}
              googleMaps={googleMaps}
              pano={streetView}
              position={item.pov}
              title={item.title}
              anchor={new googleMaps.Point(item.point[0], item.point[1])}
              size={new googleMaps.Size(20, 20)}
              container={_streetView.current}
              clickFunc={() => {
                dispatch({
                  type: FILL_STREET_VIEW_SELECT_IMAGE,
                  payload: item.image_id,
                });
              }}
            >
              <SingleMarkerInnerWrapper targetType={item.title}>
                <SingleMarkerInnerContainer>
                  <SingleMarkerInnerText>
                    <strong>Type</strong>: {item.title}
                  </SingleMarkerInnerText>
                  <SingleMarkerInnerText>
                    <strong>Subtype</strong>:{" "}
                    {item.subtype ? item.subtype : "null"}
                  </SingleMarkerInnerText>
                  <SingleMarkerInnerText>
                    <strong>LabeledBy</strong>: {item.nickname}
                  </SingleMarkerInnerText>
                </SingleMarkerInnerContainer>
              </SingleMarkerInnerWrapper>
            </SingleMarker>
          ))}
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
