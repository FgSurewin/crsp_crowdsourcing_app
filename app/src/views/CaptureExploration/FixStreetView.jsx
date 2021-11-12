import React from "react";
import OriginalMap from "../../components/OriginalMap";
import { generateMapOption, generateStreetOption } from "./utils";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LOGIN } from "../../redux/actionTypes";
// import { fetchRandomList } from "../../api/images";
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
  GetImageButton,
  ImageListContainer,
} from "./style";
import { deleteAllLocal } from "../../utils/localStorage";
import { Progress, message } from "antd";
import {
  FILL_STREET_VIEW_IMAGE_LIST,
  FILL_STREET_VIEW_INFO,
  FILL_STREET_VIEW_LOCATION,
  FILL_STREET_VIEW_WITHOUT_IMAGE_LIST,
} from "../../redux/reducers/streetView";
import {
  fetchGoogleStreetView,
  fetchMetadata,
} from "../../api/staticStreetView";
import { UploadProgressContainer } from "../../components/StreetViewOnly/style";
import PreviewModal from "../../components/StreetViewOnly/PreviewModal";
import { storage } from "../../firebase";
import { FILL_STREET_VIEW_IMAGE } from "../../redux/reducers/streetView";
import { fetchStreetViewImagesByPano } from "../../api/collectImage";

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

/**
 * This view is only used to collect specific areas' data.
 * We conduct a evaluation test in some pre-define areas.
 */

const fixLocations = [
  { lat: 40.74272, lng: -73.99438 },
  { lat: 40.742202, lng: -73.995146 },
  { lat: 40.740962, lng: -73.992174 },
  { lat: 40.741539, lng: -73.991688 },
  { lat: 40.740347, lng: -73.992549 },
  { lat: 40.741577, lng: -73.995471 },
  { lat: 40.741057, lng: -73.99607 },
  { lat: 40.739733, lng: -73.992911 },
  { lat: 40.738219, lng: -73.998904 },
  { lat: 40.740518, lng: -74.00024 },
];

const FixStreetView = () => {
  /* ------------------------------ Choose Button ----------------------------- */
  /**
   * I have two buttons in this page
   * Capture button is used to take the screenshot
   * Get image button is used to query google image
   * In order to easily modify this two functions/features,
   * I put all logic functions into this whole module.
   */
  const [showWhichBtn] = React.useState(false);

  const locationInfo = React.useRef(defaultInfo);

  // Router
  const history = useHistory();

  // Redux
  // const {  position  } = useSelector(
  //   (state) => state.map
  // );
  const {
    pano,
    panoMarkers,
    progress,
    images: imageList,
    location,
    pov,
    selectImage,
  } = useSelector((state) => state.streetView);

  // To solve image list problem
  // const imageList = images.length > 0 ? images : null;

  const dispatch = useDispatch();
  const _mount = React.useRef(pano);
  const _first = React.useRef(false);
  /* ------------------------------ Upload Image ------------------------------ */
  const [uploadProgress, setUploadProgress] = React.useState(null);

  /* ------------------------------ Preview Modal ----------------------------- */
  const [previewImg, setPreviewImg] = React.useState(null);
  const [imgBlob, setImgBlob] = React.useState(null);
  const [showPreview, setShowPreview] = React.useState(false);
  const hidePreviewModal = () => {
    setShowPreview(false);
  };
  const confirmPreviewModal = () => {
    setShowPreview(false);
    saveReduxPov();
    imgBlob && uploadImage(imgBlob);
  };

  /* ------------------------------ Autocomplete - Google Places Library ------------------------------ */
  // const _searchInput = React.useRef();
  // const [searchLocation, setSearchLocation] = React.useState(null);

  const saveStreetViewImageInRedux = React.useCallback(
    async function () {
      try {
        // const { data } = await fetchRandomList();
        // const list = data.data[0];
        // const location = {
        //   lat: list.lat,
        //   lng: list.lon,
        // };
        const location = fixLocations[Math.floor((Math.random() * 10) % 10)];
        const { data: newMetaData } = await fetchMetadata(
          process.env.REACT_APP_API_KEY,
          location
        );
        if (newMetaData.status === "OK") {
          dispatch({ type: FILL_STREET_VIEW_LOCATION, payload: newMetaData });
        } else {
          history.push("/home");
        }
        const { data: streetViewImages } = await fetchStreetViewImagesByPano(
          newMetaData.pano_id
        );
        if (streetViewImages.code === 0) {
          dispatch({
            type: FILL_STREET_VIEW_IMAGE_LIST,
            payload: streetViewImages.data,
          });
        } else {
          dispatch({
            type: FILL_STREET_VIEW_WITHOUT_IMAGE_LIST,
          });
        }
        _mount.current = true;
      } catch (_) {
        history.push("/login");
        deleteAllLocal();
        dispatch({ type: LOGIN, payload: { id: "", token: "", nickname: "" } });
      }
    },
    [dispatch, history]
  );

  // Component onMounted
  React.useEffect(() => {
    if (!_mount.current) saveStreetViewImageInRedux();
  }, [saveStreetViewImageInRedux]);

  const handlePosition = async (mapInfo) => {
    try {
      const { data: streetViewImages } = await fetchStreetViewImagesByPano(
        mapInfo.pano
      );
      if (streetViewImages.code === 0) {
        dispatch({
          type: FILL_STREET_VIEW_IMAGE_LIST,
          payload: streetViewImages.data,
        });
      } else {
        dispatch({
          type: FILL_STREET_VIEW_WITHOUT_IMAGE_LIST,
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
    if (_first.current) {
      handlePosition(e);
    } else {
      _first.current = true;
    }
  };

  const onPovChanged = (e, map) => {
    locationInfo.current = e;
    // console.log("onPovChanged ->", e);
  };

  function saveReduxPov() {
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
  }
  /* -------------------------- Handle Capture Button ------------------------- */
  const handleCaptureButton = () => {
    saveReduxPov();
    history.push("/captureImage");
  };

  /* ------------------------- Handle Get Image Button ------------------------ */
  const handleGetImageButton = async () => {
    try {
      const result = await fetchGoogleStreetView(
        process.env.REACT_APP_API_KEY,
        locationInfo.current.pov.heading,
        locationInfo.current.pov.pitch,
        locationInfo.current.position.lat,
        locationInfo.current.position.lng,
        locationInfo.current.pov.zoom
      );
      if (result.status === 200) {
        const newImgSrc = await window.URL.createObjectURL(result.data);
        setImgBlob(result.data);
        setPreviewImg(newImgSrc);
        setShowPreview(true);
      } else {
        message.warning("The street view does not exist...");
      }
    } catch (e) {
      message.error(new Error(e).message);
    }
  };

  function uploadImage(imgBlob) {
    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storage
      .ref(
        `${locationInfo.current.pano}/h_${locationInfo.current.pov.heading}_p_${locationInfo.current.pov.pitch}`
      )
      .put(imgBlob);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed", // or 'firebase.storage.TaskEvent.STATE_CHANGED'
      (snapshot) => {
        const currentProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(currentProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          dispatch({
            type: FILL_STREET_VIEW_IMAGE,
            payload: { imgSize: [640, 640], imgSrc: url },
          });
          message.success("Upload successfully");
          history.push("/captureLabelPage");
        });
      }
    );
  }

  return (
    <>
      <ExplorationWrapper>
        <Navbar primary="white" isStatic={true} isFixed={true} />
        {pano && (
          <ExplorationContainer>
            <OriginalMap
              api={process.env.REACT_APP_API_KEY}
              streetViewOptions={generateStreetOption(
                location.lat,
                location.lng,
                pov.heading,
                pov.pitch
                // pov.zoom
              )}
              mapOptions={generateMapOption(location.lat, location.lng)}
              events={{ onPositionChanged, onPovChanged }}
              panoMarkers={panoMarkers}
            />
            <ExplorationPanel>
              <ExplorationCover>
                <div style={{ width: "420px" }}>
                  <Progress percent={progress} />
                </div>
                <ImageListContainer scroll={imageList.length >= 4}>
                  {imageList.length > 0 &&
                    imageList.map(({ _id, completed, image_id }, index) => (
                      <ExplorationShowcase
                        key={_id + index}
                        select={selectImage === image_id}
                      >
                        <ShowcaseText finished={completed.toString()}>
                          Image - {index}
                        </ShowcaseText>
                        <ShowcaseButton
                          finished={completed.toString()}
                          onClick={() => {
                            history.push(`/editCaptureLabelPage/${_id}`);
                          }}
                          disabled={completed}
                        >
                          {completed ? "completed" : "view"}
                        </ShowcaseButton>
                      </ExplorationShowcase>
                    ))}
                </ImageListContainer>
              </ExplorationCover>
              <ExplorationBtnGroup>
                <CaptureButtonTips>
                  Please help us capture missing street view
                </CaptureButtonTips>
                {showWhichBtn ? (
                  <CaptureButton onClick={handleCaptureButton}>
                    CAPTURE
                  </CaptureButton>
                ) : (
                  <GetImageButton onClick={handleGetImageButton}>
                    QUERY
                  </GetImageButton>
                )}
                <NextButton
                  onClick={async () => {
                    saveStreetViewImageInRedux();
                    _first.current = false;
                    // setSearchLocation(null);
                  }}
                >
                  NEXT
                </NextButton>
              </ExplorationBtnGroup>
            </ExplorationPanel>
          </ExplorationContainer>
        )}
      </ExplorationWrapper>
      {previewImg && (
        <PreviewModal
          show={showPreview}
          confirmModal={confirmPreviewModal}
          hideModal={hidePreviewModal}
          imgSrc={previewImg}
          top={20}
        />
      )}
      {uploadProgress && (
        <UploadProgressContainer>
          <Progress type="circle" percent={uploadProgress} />
        </UploadProgressContainer>
      )}
    </>
  );
};

export default FixStreetView;
