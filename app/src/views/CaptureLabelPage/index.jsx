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
import { addCreateCredit, addNumberByType } from "../../api/user";

export default function CaptureLabelPage() {
  /* ---------------------------------- Redux --------------------------------- */
  const { imgSrc, pov, pano, location, imgSize, progress } = useSelector(
    (state) => state.streetView
  );
  const { nickname, id: userId } = useSelector((state) => state.user);
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
      labeled_area: labelsReverser(value, imgSize, nickname),
      nickname,
    });
    const newImageFromDB = await createImage(newImage);
    const number = progress + 10 === 100 ? 3 : 1;
    await addCreateCredit({ id: userId, number });
    await addNumberByType({
      name: nickname,
      number: value.length,
      type: "label",
    });
    dispatch({
      type: FILL_STREET_VIEW_MARKERS,
      payload: panoMarkers,
    });
    dispatch({
      type: FILL_STREET_VIEW_ADD_IMAGE,
      payload: newImageFromDB.data.data,
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
