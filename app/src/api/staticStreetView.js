import axios from "axios";

const fetchURL = (key, heading, pitch, lat, lon, zoom) => {
  // return `https://maps.googleapis.com/maps/api/streetview?size=640x640&location=${lat},${lon}&fov=90&heading=${heading}&pitch=${pitch}&key=${key}`;
  return `https://maps.googleapis.com/maps/api/streetview?size=640x640&location=${lat},${lon}&fov=${getFov(
    zoom
  )}&heading=${heading}&pitch=${pitch}&key=${key}`;
};

export const fetchGoogleStreetView = (key, heading, pitch, lat, lon, zoom) => {
  const link = fetchURL(key, heading, pitch, lat, lon, zoom);
  return axios.get(link, {
    responseType: "blob",
  });
};
export function getFov(zoom) {
  let result = 90;
  switch (Math.round(zoom)) {
    case 0:
      result = 180;
      break;
    case 1:
      result = 90;
      break;
    case 2:
      result = 45;
      break;
    case 3:
      result = 22.5;
      break;
    case 4:
      result = 11.25;
      break;
    default:
      break;
  }
  return result;
}

export function fetchMetadata(key, location) {
  return axios.get(
    `https://maps.googleapis.com/maps/api/streetview/metadata?location=${location.lat},${location.lng}&key=${key}`
  );
}
