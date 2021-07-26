import React from "react";
import OriginalMap from "../../components/OriginalMap";
import { generateMapOption, generateStreetOption } from "./utils";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { HANDLE_EMPTY, HANDLE_MAP, LOGIN } from "../../redux/actionTypes";
import { fetchImagesByPano, fetchRandomList } from "../../api/images";
import Navbar from "../../components/Navbar";
import {
  ExplorationContainer,
  ExplorationCover,
  ExplorationPanel,
  ExplorationShowcase,
  ExplorationWrapper,
  NextButton,
  ShowcaseButton,
  ShowcaseText,
} from "./style";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { deleteAllLocal } from "../../utils/localStorage";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const defaultInfo = {
  pano: "",
  position: {
    lat: 40.7541,
    lng: -73.99208,
  },
  pov: {
    heading: 34,
    pitch: 10,
    zoom: 1,
  },
};
const Exploration = () => {
  const locationInfo = React.useRef(defaultInfo);

  // Router
  const history = useHistory();

  // Redux
  const { pano, tempPano, position, images, progress } = useSelector(
    (state) => state.map
  );

  // To solve image list problem
  const imageList = pano === tempPano ? images : null;

  const dispatch = useDispatch();
  const _mount = React.useRef(pano);
  const _first = React.useRef(false);

  // Component onMounted
  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await fetchRandomList();
        dispatch({ type: HANDLE_MAP, payload: data.data });
      } catch (_) {
        history.push("/login");
        deleteAllLocal();
        dispatch({ type: LOGIN, payload: { id: "", token: "", nickname: "" } });
      }
    }
    if (!_mount.current) fetchData();
  }, [dispatch, history]);

  const handlePosition = async (mapInfo) => {
    try {
      const { data } = await fetchImagesByPano(mapInfo.pano);
      if (data.code === 0 && mapInfo.pano !== pano) {
        dispatch({ type: HANDLE_MAP, payload: data.data });
      } else {
        dispatch({
          type: HANDLE_EMPTY,
          payload: { pano: mapInfo.pano },
        });
      }
    } catch (_) {
      history.push("/login");
      deleteAllLocal();
      dispatch({ type: LOGIN, payload: { id: "", token: "", nickname: "" } });
    }
  };

  const onPositionChanged = (e, map) => {
    locationInfo.current = e;
    map.setCenter(locationInfo.current.position);
    if (_first.current) {
      handlePosition(e);
    } else {
      _first.current = true;
    }
  };

  return (
    <ExplorationWrapper>
      <Navbar primary="white" isStatic={true} isFixed={true} />
      {pano && (
        <ExplorationContainer>
          <OriginalMap
            api={process.env.REACT_APP_API_KEY}
            streetViewOptions={generateStreetOption(
              position.lat,
              position.lng,
              position.heading
            )}
            mapOptions={generateMapOption(position.lat, position.lng)}
            events={{ onPositionChanged }}
          />
          <ExplorationPanel>
            <ExplorationCover>
              <LinearProgressWithLabel
                value={parseInt(progress)}
                variant="determinate"
              />
              {imageList &&
                imageList.map(({ _id, completed }, index) => (
                  <ExplorationShowcase key={_id}>
                    <ShowcaseText finished={completed.toString()}>
                      Image - {index}
                    </ShowcaseText>
                    <ShowcaseButton
                      finished={completed.toString()}
                      onClick={() => {
                        history.push(`/validation/${_id}`);
                      }}
                      disabled={completed}
                    >
                      {completed ? "completed" : "view"}
                    </ShowcaseButton>
                  </ExplorationShowcase>
                ))}
            </ExplorationCover>
            <NextButton
              onClick={async () => {
                try {
                  const { data } = await fetchRandomList();
                  dispatch({ type: HANDLE_MAP, payload: data.data });
                  _first.current = false;
                } catch (_) {
                  history.push("/login");
                  deleteAllLocal();
                  dispatch({
                    type: LOGIN,
                    payload: { id: "", token: "", nickname: "" },
                  });
                }
              }}
            >
              NEXT
            </NextButton>
          </ExplorationPanel>
        </ExplorationContainer>
      )}
    </ExplorationWrapper>
  );
};

export default Exploration;
