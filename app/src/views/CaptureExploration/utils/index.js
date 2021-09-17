export function debounce(fn, time) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(fn.bind(...args), time);
  };
}

export function isEqual(pre, next) {
  let result = true;
  Object.keys(pre).forEach((key) => {
    if (pre[key] !== next[key]) {
      result = false;
      return result;
    }
  });
  return result;
}

export function generateMapOption(lat, lng) {
  return {
    center: {
      lat,
      lng,
    },
    zoom: 18,
  };
}

export function generateStreetOption(
  lat,
  lng,
  heading = 230,
  pitch = 0,
  zoom = 1
) {
  return {
    position: {
      lat,
      lng,
    },
    pov: {
      heading,
      pitch,
    },
    zoom,
  };
}
