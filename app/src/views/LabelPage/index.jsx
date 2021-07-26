import React from "react";
import Logo from "../../images/SmallLogo.svg";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchImage, fetchToggle, addLabeledArea } from "../../api/images";
import { addImages } from "../../api/user";
import { ReactLabelTool } from "@fgsurewin/react_labeltool";
import { labelsDecorator, typeConfig, labelsReverser } from "./utils";
import { HANDLE_COMPLETED, LOGIN } from "../../redux/actionTypes";
import { deleteAllLocal } from "../../utils/localStorage";

export default function LabelPage() {
  const [state, setState] = React.useState(null);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { progress } = useSelector((state) => state.map);
  const { id: userId } = useSelector((state) => state.user);

  React.useEffect(() => {
    async function loadFunction() {
      try {
        const { data } = await fetchImage(params.id);
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
        await fetchToggle({ labeled: false, id: params.id });
      } catch (_) {
        history.push("/login");
        deleteAllLocal();
        dispatch({ type: LOGIN, payload: { id: "", token: "", nickname: "" } });
      }
    };
  }, [params, dispatch, history]);

  const onCancel = async () => {
    try {
      await fetchToggle({
        labeled: false,
        id: params.id,
      });
      Modal.confirm({
        title: "Warning Message",
        content: "Do you want to leave without confirmation?",
        cancelText: "Cancel",
        onCancel() {},
        onOk() {
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
      await addLabeledArea({
        id: params.id,
        labelArea: labelsReverser(value),
      });
      dispatch({ type: HANDLE_COMPLETED, payload: params.id });
      await fetchToggle({ labeled: false, id: params.id });
      const number = progress + 10 === 100 ? 3 : 1;
      await addImages({ id: userId, number });
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
