import React from "react";
import Navbar from "../../components/Navbar";
import { Form, Input, Button, Select, message } from "antd";
import {
  FormWrapper,
  SignUpContainer,
  SignUpText,
  SignUpWrapper,
  TipText,
} from "./SignUpStyle";
import { NavLink, useHistory } from "react-router-dom";
import { testEmail } from "../../utils/Reg";
import { signUp } from "../../api/user";
// import { useScroll } from "../../hooks/useScroll";
const { Option } = Select;

export default function SignUp() {
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = async (values) => {
    const result = await signUp(values);
    if (result.data.code === 0) {
      message.success(result.data.message);
      history.push("/login");
    } else form.resetFields();
  };
  const checkEmail = (_, value) => {
    if (value === "") return Promise.resolve();
    if (testEmail(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Please input a valid email!"));
  };

  const checkConfirmPassword = (_, value) => {
    if (!value || form.getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("The two passwords that you entered do not match!")
    );
  };

  return (
    <SignUpWrapper>
      <Navbar primary={"white"} />
      <SignUpContainer justify={"center"} align={"middle"}>
        <FormWrapper span={20}>
          <SignUpText>
            <strong>Already have an account? </strong>
            <NavLink to="/login">Login</NavLink>
          </SignUpText>
          <Form
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            //initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Nickname"
              name="nickname"
              rules={[
                { required: true, message: "Please input your nickname!" },
              ]}
            >
              <Input />
            </Form.Item>
            <div>
              <TipText>We encourage you to use your university email</TipText>
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
            </div>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirm password"
              rules={[
                {
                  validator: checkConfirmPassword,
                },
                {
                  required: true,
                  message: "Please input your confirm password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="role"
              label="role"
              rules={[{ required: true, message: "Please select role!" }]}
            >
              <Select placeholder="select your role">
                <Option value="student">Student</Option>
                <Option value="faculty">Faculty</Option>
                <Option value="volunteer">Volunteer</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Institution"
              name="institution"
              rules={[
                { required: true, message: "Please input your institution!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </FormWrapper>
      </SignUpContainer>
    </SignUpWrapper>
  );
}
