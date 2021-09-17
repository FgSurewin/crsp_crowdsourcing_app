export const defaultStreetViewOptions = {
  zoomControl: false,
  scrollwheel: false,
  fullscreenControl: false,
  panControl: false,
  linksControl: false,
  disableDefaultUI: true,
  clickToGo: false,
};

export const combineStreetViewOptions = (options) =>
  Object.assign({}, options, defaultStreetViewOptions);
