import { HANDLE_COMPLETED, HANDLE_MAP, HANDLE_EMPTY } from "../actionTypes";

// I barely use the images list.
// I only use it to show on the exploration page
const initialState = {
  pano: null,
  tempPano: null, // tempPano is a flag that can be used to in the onPositionChange event
  position: {
    lat: 0,
    lng: 0,
  },
  images: [],
  progress: 0,
};

function mapReducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_MAP:
      const list = action.payload;
      return {
        ...state,
        pano: list[0].pano,
        tempPano: list[0].pano,
        position: {
          ...state.position,
          lat: list[0].lat,
          lng: list[0].lon,
          heading: list[0].yaw,
        },
        images: [...list].map((item) =>
          Object.assign(item, { completed: false })
        ),
      };

    // tempPano is used to do comparison with pano
    case HANDLE_EMPTY:
      const result = action.payload;
      return {
        ...state,
        tempPano: result.pano,
      };

    case HANDLE_COMPLETED:
      const id = action.payload;
      return {
        ...state,
        progress: (state.progress + 10) % 100,
        images: [...state.images].map((item) => {
          if (item._id === id) item.completed = true;
          return item;
        }),
      };

    default:
      return state;
  }
}
export default mapReducer;
