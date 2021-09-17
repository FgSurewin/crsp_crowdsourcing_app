import React from "react";
import OriginalMap from "../../components/OriginalMap";
import { generateMapOption, generateStreetOption } from "./utils";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { HANDLE_EMPTY, HANDLE_MAP, LOGIN } from "../../redux/actionTypes";
import { fetchImagesByPano, fetchRandomList } from "../../api/images";
import Navbar from "../../components/Navbar";
import {
  CaptureButton,
  ExplorationBtnGroup,
  ExplorationContainer,
  ExplorationCover,
  ExplorationPanel,
  ExplorationShowcase,
  ExplorationWrapper,
  NextButton,
  ShowcaseButton,
  ShowcaseText,
  CaptureButtonTips,
} from "./style";
import { deleteAllLocal } from "../../utils/localStorage";
import { Progress } from "antd";
import { FILL_STREET_VIEW_INFO } from "../../redux/reducers/streetView";

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

  const onPovChanged = (e, map) => {
    locationInfo.current = e;
    map.setCenter(locationInfo.current.position);
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
            events={{ onPositionChanged, onPovChanged }}
          />
          <ExplorationPanel>
            <ExplorationCover>
              <div style={{ width: "420px" }}>
                <Progress percent={progress} />
              </div>
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
            <ExplorationBtnGroup>
              <CaptureButtonTips>
                Please help us capture missing street view
              </CaptureButtonTips>
              <CaptureButton
                onClick={() => {
                  const capturePano = locationInfo.current.pano;
                  const captureLocation = locationInfo.current.position;
                  const capturePov = locationInfo.current.pov;
                  dispatch({
                    type: FILL_STREET_VIEW_INFO,
                    payload: {
                      pano: capturePano,
                      location: captureLocation,
                      pov: capturePov,
                    },
                  });
                  history.push("/captureImage");
                }}
              >
                CAPTURE
              </CaptureButton>
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
            </ExplorationBtnGroup>
          </ExplorationPanel>
        </ExplorationContainer>
      )}
    </ExplorationWrapper>
  );
};

export default Exploration;
