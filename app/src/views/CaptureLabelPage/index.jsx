import React from "react";
import Logo from "../../images/SmallLogo.svg";
import { useSelector, useDispatch } from "react-redux";
import { ReactLabelTool } from "@fgsurewin/react_labeltool";
import {
  generateImage,
  generatePanoMarkersAtCenter,
  typeConfig,
  labelsReverser,
} from "./utils";
import {
  FILL_STREET_VIEW_ADD_IMAGE,
  FILL_STREET_VIEW_MARKERS,
} from "../../redux/reducers/streetView";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { createImage } from "../../api/collectImage";

export default function CaptureLabelPage() {
  /* ---------------------------------- Redux --------------------------------- */
  const { imgSrc, pov, pano, location, imgSize } = useSelector(
    (state) => state.streetView
  );
  const { nickname } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  /* --------------------------------- Router --------------------------------- */
  const history = useHistory();

  const onSubmit = async (value) => {
    const image_id = uuidv4();
    const panoMarkers = generatePanoMarkersAtCenter(
      value,
      pov,
      image_id,
      nickname
    );
    const newImage = generateImage({
      image_id,
      pano,
      location,
      imgSize,
      pov,
      imgSrc,
      panoMarkers,
      labeled_area: labelsReverser(value, imgSize),
    });
    await createImage(newImage);
    dispatch({
      type: FILL_STREET_VIEW_MARKERS,
      payload: panoMarkers,
    });
    dispatch({
      type: FILL_STREET_VIEW_ADD_IMAGE,
      payload: { ...newImage, completed: true },
    });
    history.push("streetView");
  };
  const onCancel = (value) => {
    history.push("streetView");
  };

  return (
    <div>
      {imgSrc && (
        <ReactLabelTool
          Logo={Logo}
          typeConfig={typeConfig}
          labels={[]}
          imgUrl={imgSrc}
          handleSubmit={onSubmit}
          handleBack={onCancel}
        />
      )}
    </div>
  );
}
