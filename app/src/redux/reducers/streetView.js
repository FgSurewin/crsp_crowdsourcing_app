export const FILL_STREET_VIEW_INFO = "FILL_STREET_VIEW_INFO";
export const FILL_STREET_VIEW_IMAGE = "FILL_STREET_VIEW_IMAGE";
export const FILL_STREET_VIEW_MARKERS = "FILL_STREET_VIEW_MARKERS";
export const FILL_STREET_VIEW_IMAGE_LIST = "FILL_STREET_VIEW_IMAGE_LIST";
export const FILL_STREET_VIEW_LOCATION = "FILL_STREET_VIEW_LOCATION";
export const FILL_STREET_VIEW_WITHOUT_IMAGE_LIST =
  "FILL_STREET_VIEW_WITHOUT_IMAGE_LIST";
export const FILL_STREET_VIEW_ADD_IMAGE = "FILL_STREET_VIEW_ADD_IMAGE";
export const FILL_STREET_VIEW_CLEAR_MARKERS = "FILL_STREET_VIEW_CLEAR_MARKERS";
export const FILL_STREET_VIEW_IMAGE_COMPLETED =
  "FILL_STREET_VIEW_IMAGE_COMPLETED";
export const FILL_STREET_VIEW_SELECT_IMAGE = "FILL_STREET_VIEW_SELECT_IMAGE";

const initialState = {
  pano: null,
  location: {
    lat: 0,
    lng: 0,
  },
  pov: {
    heading: 0,
    pitch: 0,
    zoom: 1,
  },
  progress: 0,
  panoMarkers: [],
  images: [],
  imgSize: [],
  imgSrc: "",
  selectImage: null,
};

function streetViewReducer(state = initialState, action) {
  switch (action.type) {
    case FILL_STREET_VIEW_INFO:
      const { pano, location, pov } = action.payload;
      return {
        ...state,
        pano,
        location,
        pov,
      };
    case FILL_STREET_VIEW_IMAGE:
      const { imgSize, imgSrc } = action.payload;
      return {
        ...state,
        imgSize,
        imgSrc,
      };
    case FILL_STREET_VIEW_MARKERS:
      const newMarkers = action.payload;
      return {
        ...state,
        panoMarkers: [...state.panoMarkers, ...newMarkers],
      };

    case FILL_STREET_VIEW_IMAGE_LIST:
      const list = action.payload;
      let finalStreetMarkerList = [];
      const streetMarkerList = list.map((item) => item.panoMarkers);
      streetMarkerList.forEach((item) => {
        finalStreetMarkerList = finalStreetMarkerList.concat(item);
      });
      return {
        ...state,
        images: [...list].map((item) =>
          Object.assign(item, { completed: false })
        ),
        panoMarkers: finalStreetMarkerList,
      };

    case FILL_STREET_VIEW_WITHOUT_IMAGE_LIST:
      return {
        ...state,
        images: [],
        panoMarkers: [],
        selectImage: null,
      };

    case FILL_STREET_VIEW_ADD_IMAGE:
      const addImage = action.payload;
      return {
        ...state,
        images: [...state.images, addImage],
        progress: (state.progress + 10) % 100,
      };

    case FILL_STREET_VIEW_LOCATION:
      return {
        ...state,
        location: action.payload.location,
        pano: action.payload.pano_id,
      };

    case FILL_STREET_VIEW_CLEAR_MARKERS:
      return {
        ...state,
        panoMarkers: state.panoMarkers.filter(
          (item) => item.image_id !== action.payload.image_id
        ),
      };

    case FILL_STREET_VIEW_IMAGE_COMPLETED:
      const id = action.payload;
      return {
        ...state,
        progress: (state.progress + 10) % 100,
        images: [...state.images].map((item) => {
          if (item._id === id) item.completed = true;
          return item;
        }),
      };

    case FILL_STREET_VIEW_SELECT_IMAGE:
      const currentImage = action.payload;
      return {
        ...state,
        selectImage: currentImage,
      };

    default:
      return state;
  }
}

export default streetViewReducer;
