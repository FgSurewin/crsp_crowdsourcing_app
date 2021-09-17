import React from "react";
import asyncLoading from "react-async-loader";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { combineStreetViewOptions } from "./utils/streetViewTools";
import {
  OriginalMapWrapper,
  StreetViewWindow,
  OnlyStreetViewContainer,
  StreetViewShade,
  UploadProgressContainer,
} from "./style";
import InstructionModal from "./InstructionModal";
import {
  detectBrowser,
  startCapture,
  stopCapture,
  takeScreenShot,
} from "./utils/screenshotHelper";
import { message, Progress } from "antd";
import { storage } from "../../firebase";
import PreviewModal from "./PreviewModal";
import { FILL_STREET_VIEW_IMAGE } from "../../redux/reducers/streetView";

const StreetViewOnly = ({ mainStyle, googleMaps, streetViewOptions }) => {
  const _streetView = React.useRef();
  const [streetView, setStreetView] = React.useState(null);

  /* ------------------------------ Upload Image ------------------------------ */
  const [uploadProgress, setUploadProgress] = React.useState(null);

  /* ---------------------------------- Redux --------------------------------- */
  const { pov, pano } = useSelector((state) => state.streetView);
  const dispatch = useDispatch();

  /* --------------------------------- Router --------------------------------- */
  const history = useHistory();

  /* -------------------------- Setup for screenshot -------------------------- */
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const imgInfo = React.useRef(null);

  /* ---------------------------- Instruction Modal --------------------------- */
  const [show, setShow] = React.useState(false);
  const hideModal = () => {
    setShow(false);
    history.push("/streetView");
  };
  const confirmModal = () => {
    capture();
  };
  async function capture() {
    setShow(false);
    try {
      const isChrome = detectBrowser();
      if (isChrome) {
        videoRef.current.srcObject = await startCapture();
        const videoTrack = videoRef.current.srcObject.getVideoTracks()[0];
        const videoSetting = videoTrack.getSettings();
        if (videoSetting.displaySurface === "monitor") {
          setTimeout(() => {
            imgInfo.current = takeScreenShot(
              canvasRef.current,
              videoRef.current
            );
            setShowPreview(true);
          }, 500);
        } else {
          stopCapture(videoRef.current);
          message.error("Please share the entire screen!");
          history.push("/streetView");
        }
      } else {
        message.error("Please use Chrome to enable the capture function!");
        history.push("/streetView");
      }
    } catch (err) {
      history.push("/streetView");
    }
  }
  /* ------------------------------ Preview Modal ----------------------------- */
  const [showPreview, setShowPreview] = React.useState(false);
  const hidePreviewModal = () => {
    setShowPreview(false);
    history.push("/streetView");
  };
  const confirmPreviewModal = () => {
    setShowPreview(false);
    if (imgInfo.current) {
      handleUploadImage(imgInfo.current.imgSrc);
    }
  };

  function handleUploadImage(imgSrc) {
    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storage
      .ref(`${pano}/h_${pov.heading}_p_${pov.pitch}`)
      .putString(imgSrc, "data_url");

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
          if (imgInfo.current) {
            dispatch({
              type: FILL_STREET_VIEW_IMAGE,
              payload: { imgSize: imgInfo.current.imgSize, imgSrc: url },
            });
          }
          message.success("Upload successfully");
          history.push("/captureLabelPage");
        });
      }
    );
  }

  React.useEffect(() => {
    // First initialization
    if (streetView === null && googleMaps) {
      setStreetView(
        new googleMaps.StreetViewPanorama(
          _streetView.current,
          combineStreetViewOptions(streetViewOptions)
        )
      );
    }

    if (streetView !== null && googleMaps) {
      setShow(true);
    }

    return () => {
      if (streetView) {
        googleMaps.event.clearInstanceListeners(streetView);
      }
    };
  }, [streetView, googleMaps, streetViewOptions]);

  return (
    <>
      <OriginalMapWrapper id="StreetView">
        <OnlyStreetViewContainer style={mainStyle}>
          <StreetViewShade />
          <StreetViewWindow id="streetView" ref={_streetView} />
        </OnlyStreetViewContainer>
      </OriginalMapWrapper>
      <video
        ref={videoRef}
        autoPlay
        style={{
          display: "none",
        }}
      ></video>
      <canvas ref={canvasRef} id="canvas" style={{ display: "none" }}></canvas>
      <InstructionModal
        show={show}
        confirmModal={confirmModal}
        hideModal={hideModal}
      />
      <PreviewModal
        show={showPreview}
        confirmModal={confirmPreviewModal}
        hideModal={hidePreviewModal}
        imgSrc={imgInfo.current && imgInfo.current.imgSrc}
      />
      {uploadProgress && (
        <UploadProgressContainer>
          <Progress type="circle" percent={uploadProgress} />
        </UploadProgressContainer>
      )}
    </>
  );
};

const mapScriptsToProps = ({ api }) => ({
  googleMaps: {
    globalPath: "google.maps",
    url: `https://maps.googleapis.com/maps/api/js?key=${api}&v=weekly`,
    jsonp: true,
  },
});

export default asyncLoading(mapScriptsToProps)(StreetViewOnly);
