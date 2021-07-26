import React from "react";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { Form, Input, Button, message } from "antd";
import { FormWrapper, LoginText, LoginContainer } from "./LoginStyle";
import { NavLink, useHistory } from "react-router-dom";
import { testEmail } from "../../utils/Reg";
import { login } from "../../api/user";
import { LOGIN } from "../../redux/actionTypes";
import { ID, NICKNAME, saveLocal, TOKEN } from "../../utils/localStorage";

export default function Login() {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const result = await login(values).catch(() => {
      history.push("/home");
    });
    if (result.data.code === 0) {
      const { id, nickname, token } = result.data.data;
      dispatch({ type: LOGIN, payload: { id, nickname, token } });
      saveLocal(ID, id);
      saveLocal(TOKEN, token);
      saveLocal(NICKNAME, nickname);
      message.success(result.data.message);
      history.push("/home");
    }
  };
  const checkEmail = (_, value) => {
    if (value === "") return Promise.resolve();
    if (testEmail(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Please input a valid email!"));
  };

  return (
    <div>
      <Navbar primary={"white"} />
      <LoginContainer justify={"center"} align={"middle"}>
        <FormWrapper span={20}>
          <LoginText>
            <strong>Don't have an account? </strong>
            <NavLink to="/signUp">Sign Up</NavLink>
          </LoginText>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            form={form}
            //initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  validator: checkEmail,
                },
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Log In
              </Button>
            </Form.Item>
          </Form>
        </FormWrapper>
      </LoginContainer>
    </div>
  );
}
