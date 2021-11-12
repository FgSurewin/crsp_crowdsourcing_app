import React from "react";
import { RegionMapBox, RegionMapContainer } from "./style";
// import GEOJson from "./test_street_line.geojson";
// import GEOJson2 from "./nyzd_Buffer_Intersect_Featur.geojson";
import Navbar from "../Navbar";
// import GEOJson2 from "./Borough Boundaries.geojson";

const defaultMapOptions = {
  mapTypeControlOptions: {
    mapTypeIds: [],
  },
  // zoomControl: false,
  // gestureHandling: "none",
  // fullscreenControl: false,
  // panControl: true,
  // streetViewControl: false,
  disableDefaultUI: true,
};

const combineMapOptions = (options) =>
  Object.assign({}, options, defaultMapOptions);

export default function RegionMap({ googleMaps }) {
  const _regionMap = React.useRef();
  const [regionMap, setRegionMap] = React.useState(null);
  const [streetLine, setStreetLine] = React.useState(null);

  React.useEffect(() => {
    if (regionMap === null) {
      setRegionMap(
        new googleMaps.Map(
          _regionMap.current,
          combineMapOptions({
            zoom: 11,
            center: { lat: 40.73061, lng: -73.935242 },
          })
        )
      );
      setStreetLine(new googleMaps.Data());
    }
    if (regionMap !== null && streetLine !== null) {
      // streetLine.loadGeoJson(GEOJson2);
      // streetLine.setMap(regionMap);
      // regionMap.addListener("zoom_changed", () => {
      //   console.log(regionMap.getZoom());
      //   if (regionMap.getZoom() >= 14) {
      //     streetLine.setStyle({
      //       strokeColor: "blue",
      //       strokeWeight: 2,
      //     });
      //   } else {
      //     streetLine.setStyle({
      //       strokeColor: "green",
      //       strokeWeight: 2,
      //     });
      //   }
      // });
      // regionMap.data.loadGeoJson(GEOJson2);
      // regionMap.data.addListener("click", (event) => {
      //   const cor = event.feature.getGeometry().g;
      //   const street = event.feature.getProperty("full_stree");
      //   const lat = cor[0].lat();
      //   const lng = cor[0].lng();
      //   console.log("Lat + lng: ", { lat, lng });
      //   alert(`Street: ${street} lat: ${lat} lng:${lng}`);
      // });
    }

    return () => {
      console.log("RegionMap UnMounted!!!!");
    };
  }, [setRegionMap, regionMap, googleMaps]);
  return (
    <>
      <Navbar primary="white" isStatic={true} isFixed={true} />
      <RegionMapContainer>
        <RegionMapBox ref={_regionMap} />
      </RegionMapContainer>
    </>
  );
}
