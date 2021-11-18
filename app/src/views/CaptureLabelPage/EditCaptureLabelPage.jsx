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
  addStreetViewCount,
  addStreetViewMarkers,
  addStreetViewModifier,
  clearStreetViewCount,
  fetchStreetViewImageById,
  fetchStreetViewToggle,
} from "../../api/collectImage";
import { addReviewCredit, addNumberByType } from "../../api/user";
import {
  ADD_IMAGE_COUNT,
  CLEAR_IMAGE_COUNT,
  FILL_STREET_VIEW_CLEAR_MARKERS,
  FILL_STREET_VIEW_MARKERS,
} from "../../redux/reducers/streetView";
import {
  compareLabels,
  updatePanoMarkersNames,
} from "../../utils/compareLabels";
import { message } from "antd";

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
        async onOk() {
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
      await fetchStreetViewToggle({ labeled: false, id: params.id });
      const oldLabels = state["labeled_area"];
      const newLabels = labelsReverser(value, state["image_size"], nickname);
      const { samePerson, same, final_labels } = compareLabels(
        oldLabels,
        newLabels,
        state.creator,
        nickname
      );

      async function saveDifferentLabels() {
        await addStreetViewModifier({
          id: params.id,
          modifier: { name: nickname, labels: final_labels },
        });

        // Handle Panorama Markers
        const streetViewMarkerList = generatePanoMarkersAtCenter(
          value,
          state.pov,
          state["image_id"],
          nickname
        );

        const finalStreetViewMarkerList = updatePanoMarkersNames(
          streetViewMarkerList,
          final_labels
        );

        await addStreetViewMarkers({
          id: params.id,
          markers: finalStreetViewMarkerList,
        });
        dispatch({
          type: FILL_STREET_VIEW_CLEAR_MARKERS,
          payload: {
            image_id: state["image_id"],
          },
        });
        dispatch({
          type: FILL_STREET_VIEW_MARKERS,
          payload: finalStreetViewMarkerList,
        });
        history.push("/streetView");
      }

      async function addLabelNumberByType() {
        const labelsByCreator = final_labels.filter(
          (item) => item.labeledBy === state.creator
        ).length;
        const revise = Math.abs(labelsByCreator - state["init_labels"].length);
        await addNumberByType({
          name: state["creator"],
          number: revise,
          type: "revise",
        });
        const modifiersList = final_labels.filter(
          (item) => item.labeledBy !== state.creator
        );
        if (modifiersList.length > 0) {
          modifiersList.forEach(async (item) => {
            await addNumberByType({
              name: item.labeledBy,
              number: 1,
              type: "modify",
            });
          });
        }
      }

      // There are four situations:
      // 1. Same person, Same labels, No credit
      if (samePerson && same) {
        message.warning("Reviewing your own images does not earn you points.");
        history.push("/streetView");
      }

      // 2. Same person, Different Labels, No credit
      // (Because the creators should be responsible to their labels)
      if (samePerson && !same) {
        message.success("Modify successfully!");
        saveDifferentLabels();
      }

      // 3. Different person, Same labels, Get review credit
      if (!samePerson && same) {
        message.success("Review successfully!");
        await addStreetViewCount({ id: params.id });
        const number = progress + 10 === 100 ? 3 : 1;
        await addReviewCredit({ id: userId, number });
        if (state["count"] === 2) addLabelNumberByType();
        dispatch({
          type: ADD_IMAGE_COUNT,
          payload: {
            image_id: state["image_id"],
          },
        });
        history.push("/streetView");
      }

      // 4. Different person, Different labels, Get modify credit
      if (!samePerson && !same) {
        message.success("Modify successfully!");
        await clearStreetViewCount({ id: params.id });
        dispatch({
          type: CLEAR_IMAGE_COUNT,
          payload: {
            image_id: state["image_id"],
          },
        });
        const number = progress + 10 === 100 ? 3 : 1;
        await addReviewCredit({ id: userId, number });
        saveDifferentLabels();
      }
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
