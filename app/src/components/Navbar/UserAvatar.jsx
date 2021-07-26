import React from "react";
import { useDispatch } from "react-redux";
import { Avatar, Popover, Button } from "antd";
import { LOGIN } from "../../redux/actionTypes";
import { deleteAllLocal } from "../../utils/localStorage";

export default function UserAvatar({ nickname }) {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch({ type: LOGIN, payload: { id: "", token: "", nickname: "" } });
    deleteAllLocal();
  };

  const content = (
    <div>
      <Button type="primary" danger onClick={onLogout}>
        Log Out
      </Button>
    </div>
  );

  return (
    <>
      <Popover content={content} trigger="hover">
        <Avatar
          style={{
            backgroundColor: "#D6974D",
            verticalAlign: "middle",
            fontWeight: "bolder",
            fontSize: "18px",
          }}
          size="large"
          gap={5}
        >
          {nickname ? nickname[0].toUpperCase() : "Bad"}
        </Avatar>
      </Popover>
    </>
  );
}
