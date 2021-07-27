import React from "react";
import Navbar from "../../components/Navbar";
import LoginImageBG from "../../images/login-2.jpg";
import { useDispatch } from "react-redux";
import { Form, Input, Button, message, Row, Col } from "antd";
import {
  FormWrapper,
  LoginText,
  LoginContainer,
  ImageContainer,
  LoginImage,
  LoginWrapper,
} from "./LoginStyle";
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
    <LoginWrapper>
      <Navbar primary={"white"} />
      <LoginContainer justify={"center"} align={"middle"}>
        <FormWrapper span={20} lg={6}>
          <Row align="middle" justify="center" style={{ height: "600px" }}>
            <Col span={20}>
              <LoginText>
                <strong>Don't have an account? </strong>
                <NavLink to="/signUp">Sign Up</NavLink>
              </LoginText>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
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

                <Form.Item wrapperCol={{ sm: { offset: 8, span: 16 } }}>
                  <Button type="primary" htmlType="submit">
                    Log In
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </FormWrapper>
        <ImageContainer lg={18}>
          <LoginImage src={LoginImageBG} alt="login-1" />
        </ImageContainer>
      </LoginContainer>
    </LoginWrapper>
  );
}
