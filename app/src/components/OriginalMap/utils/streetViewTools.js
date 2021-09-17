export function bindStreetViewEvents(street, events, map) {
  street.addListener("pano_changed", () => {
    if (events.onPanoChanged) {
      const result = generateInfo(
        street.getPano(),
        street.getPosition(),
        street.getPov()
      );
      events.onPanoChanged(result, map);
    }
  });

  street.addListener("position_changed", () => {
    // console.log("Origin -> ", street.getPano());
    if (events.onPositionChanged) {
      const result = generateInfo(
        street.getPano(),
        street.getPosition(),
        street.getPov()
      );
      events.onPositionChanged(result, map);
    }
  });

  street.addListener("pov_changed", () => {
    if (events.onPovChanged) {
      const result = generateInfo(
        street.getPano(),
        street.getPosition(),
        street.getPov()
      );
      events.onPovChanged(result, map);
    }
  });

  street.addListener("visible_changed", () => {
    if (events.onVisibleChanged) {
      const result = generateInfo(
        street.getPano(),
        street.getPosition(),
        street.getPov()
      );
      events.onVisibleChanged(result, map);
    }
  });

  street.addListener("zoom_changed", () => {
    if (events.onZoomChanged) {
      const result = generateInfo(
        street.getPano(),
        street.getPosition(),
        street.getPov()
      );
      events.onZoomChanged(result, street);
    }
  });
}

export const defaultStreetViewOptions = {
  scrollwheel: false,
  fullscreenControl: false,
  panControl: false,
  linksControl: true,
  disableDefaultUI: true,
  zoomControl: true,
  clickToGo: false,
};

export const combineStreetViewOptions = (options) =>
  Object.assign({}, options, defaultStreetViewOptions);

function generateInfo(pano, positionClass, pov) {
  const position = {
    lat: positionClass.lat(),
    lng: positionClass.lng(),
  };
  return {
    pano,
    pov,
    position,
  };
}
