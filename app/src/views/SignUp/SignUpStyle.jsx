import styled from "styled-components/macro";
import { Row, Col } from "antd";

export const SignUpWrapper = styled.div`
  background-color: #fbf8f5;
  height: 100vh;
`;

export const SignUpContainer = styled(Row)`
  margin-top: 60px;
  background-color: #fbf8f5;
`;

export const FormWrapper = styled(Col)`
  /* margin: 0 60px; */
`;

export const SignUpText = styled.p`
  text-align: center;
`;

export const TipText = styled.p`
  text-align: center;
  font-size: 70%;
  color: gray;
  margin-bottom: 0;
`;
