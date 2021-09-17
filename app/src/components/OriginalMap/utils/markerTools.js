import { CreatePanoMarker } from "./panomarker";

export function markersInit(googleMaps, markers, map) {
  markers &&
    markers.forEach(({ id, markerOptions }) => {
      new googleMaps.Marker(Object.assign({}, { map }, markerOptions));
    });
}

/**
 * id:string,
 * pov:{heading, pitch},
 * title:string,
 * point:[number, number]
 */

export function panoMarkerInit(googleMaps, markers, streetView, streetViewRef) {
  try {
    const streetMarker = CreatePanoMarker(googleMaps);
    markers &&
      markers.forEach(({ id, pov, title, point }) => {
        const testMarker = new streetMarker({
          pano: streetView,
          id,
          position: {
            heading: pov.heading,
            pitch: pov.pitch,
          },
          anchor: new googleMaps.Point(point[0], point[1]),
          size: new googleMaps.Size(40, 40),
          // icon: MarkerIcon,
          title,
          labelType: title,
          container: streetViewRef,
        });
        console.log("testMarker -> ", testMarker);
      });
  } catch (e) {
    console.log(new Error(e));
  }
}
