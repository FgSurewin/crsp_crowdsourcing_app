export function generateStreetOption(lat, lng, heading = 230, pitch = 0) {
  return {
    position: {
      lat,
      lng,
    },
    pov: {
      heading,
      pitch,
    },
  };
}
