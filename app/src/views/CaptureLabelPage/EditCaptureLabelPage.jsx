import React from "react";
import Logo from "../../images/SmallLogo.svg";
import { Modal } from "antd";
import { ReactLabelTool } from "@fgsurewin/react_labeltool";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../redux/actionTypes";
import { deleteAllLocal } from "../../utils/localStorage";
import {
  labelsDecorator,
  generatePanoMarkersAtCenter,
  typeConfig,
  labelsReverser,
} from "./utils";
import {
  addStreetViewLabeledArea,
  addStreetViewMarkers,
  fetchStreetViewImageById,
  fetchStreetViewToggle,
} from "../../api/collectImage";
import { addReviewCredit } from "../../api/user";
import {
  FILL_STREET_VIEW_CLEAR_MARKERS,
  FILL_STREET_VIEW_IMAGE_COMPLETED,
  FILL_STREET_VIEW_MARKERS,
} from "../../redux/reducers/streetView";

export default function EditCaptureLabelPage() {
  const [state, setState] = React.useState(null);
  const params = useParams();
  const history = useHistory();

  const dispatch = useDispatch();

  const { progress } = useSelector((state) => state.streetView);
  const { id: userId, nickname } = useSelector((state) => state.user);

  React.useEffect(() => {
    async function loadFunction() {
      try {
        const { data } = await fetchStreetViewImageById(params.id);
        setState(data.data);
      } catch (_) {
        history.push("/login");
        deleteAllLocal();
        dispatch({ type: LOGIN, payload: { id: "", token: "", nickname: "" } });
      }
    }
    loadFunction();
    return async () => {
      try {
        await fetchStreetViewToggle({ labeled: false, id: params.id });
      } catch (_) {
        history.push("/login");
        deleteAllLocal();
        dispatch({ type: LOGIN, payload: { id: "", token: "", nickname: "" } });
      }
    };
  }, [params, dispatch, history]);

  const onCancel = async () => {
    try {
      Modal.confirm({
        title: "Warning Message",
        content: "Do you want to leave without confirmation?",
        cancelText: "Cancel",
        onCancel() {},
        onOk() {
          await fetchStreetViewToggle({
            labeled: false,
            id: params.id,
          });
          history.push("/streetView");
        },
      });
    } catch (_) {
      history.push("/login");
      deleteAllLocal();
      dispatch({ type: LOGIN, payload: { id: "", token: "", nickname: "" } });
    }
  };

  const onSubmit = async (value) => {
    try {
      await addStreetViewLabeledArea({
        id: params.id,
        labelArea: labelsReverser(value, state["image_size"]),
      });
      await fetchStreetViewToggle({ labeled: false, id: params.id });
      const number = progress + 10 === 100 ? 3 : 1;
      await addReviewCredit({ id: userId, number });

      // Handle Panorama Markers
      const streetViewMarkerList = generatePanoMarkersAtCenter(
        value,
        state.pov,
        state["image_id"],
        nickname
      );
      await addStreetViewMarkers({
        id: params.id,
        markers: streetViewMarkerList,
      });
      dispatch({
        type: FILL_STREET_VIEW_CLEAR_MARKERS,
        payload: {
          image_id: state["image_id"],
        },
      });
      dispatch({
        type: FILL_STREET_VIEW_MARKERS,
        payload: streetViewMarkerList,
      });
      dispatch({ type: FILL_STREET_VIEW_IMAGE_COMPLETED, payload: params.id });

      history.push("/streetView");
    } catch (_) {
      history.push("/login");
      deleteAllLocal();
      dispatch({ type: LOGIN, payload: { id: "", token: "", nickname: "" } });
    }
  };

  return (
    <div>
      {state && (
        <ReactLabelTool
          Logo={Logo}
          typeConfig={typeConfig}
          labels={labelsDecorator(state["labeled_area"], state["image_size"])}
          imgUrl={state.url}
          handleSubmit={onSubmit}
          handleBack={onCancel}
        />
      )}
    </div>
  );
}
