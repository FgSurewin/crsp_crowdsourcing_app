import React from "react";
import Logo from "../../images/SmallLogo.svg";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  fetchToggle,
  addLabeledArea,
  fetchRandomImage,
} from "../../api/images";
import { addImages } from "../../api/user";
import { ReactLabelTool } from "@fgsurewin/react_labeltool";
import { labelsDecorator, typeConfig, labelsReverser } from "./utils";
import { HANDLE_COMPLETED, LOGIN } from "../../redux/actionTypes";
import { deleteAllLocal } from "../../utils/localStorage";

export default function LabelPage() {
  const [state, setState] = React.useState(null);
  const _state = React.useRef(null);
  const _mount = React.useRef(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const { progress } = useSelector((state) => state.map);
  const { id: userId } = useSelector((state) => state.user);

  const loadFunction = React.useCallback(
    async function () {
      try {
        const { data } = await fetchRandomImage();
        console.log("TEST -> ", data.data[0]);
        _state.current = data.data[0];
        setState(data.data[0]);
        _mount.current = true;
      } catch (_) {
        console.log(_);
        history.push("/login");
        deleteAllLocal();
        dispatch({ type: LOGIN, payload: { id: "", token: "", nickname: "" } });
      }
    },
    [dispatch, history]
  );

  React.useEffect(() => {
    if (!_mount.current) {
      loadFunction();
    }
    return async () => {
      try {
        await fetchToggle({ labeled: false, id: _state.current["_id"] });
      } catch (_) {
        history.push("/login");
        deleteAllLocal();
        dispatch({ type: LOGIN, payload: { id: "", token: "", nickname: "" } });
      }
    };
  }, [dispatch, history, loadFunction]);

  const onCancel = async () => {
    try {
      await fetchToggle({
        labeled: false,
        id: state["_id"],
      });
      Modal.confirm({
        title: "Warning Message",
        content: "Do you want to leave without confirmation?",
        cancelText: "Cancel",
        onCancel() {},
        onOk() {
          history.push("/home");
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
      await addLabeledArea({
        id: state["_id"],
        labelArea: labelsReverser(value, state["image_size"]),
      });
      dispatch({ type: HANDLE_COMPLETED, payload: state["_id"] });
      await fetchToggle({ labeled: false, id: state["_id"] });
      const number = progress + 10 === 100 ? 3 : 1;
      await addImages({ id: userId, number });

      // Get new image
      _mount.current = false;
      loadFunction();
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
