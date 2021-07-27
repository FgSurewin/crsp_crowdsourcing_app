import styled from "styled-components/macro";
import { Row, Col } from "antd";

export const LoginWrapper = styled.div`
  background-color: #fbf8f5;
  height: 100vh;
  overflow: hidden;
`;

export const LoginContainer = styled(Row)`
  /* margin-top: 80px; */
`;

export const FormWrapper = styled(Col)`
  /* margin-top: 80px; */
  align-self: flex-start;
`;

export const LoginText = styled.p`
  /* margin-top: 80px; */
  text-align: center;
`;
export const ImageContainer = styled(Col)``;

export const LoginImage = styled.img`
  height: 70%;
`;

export const BlankSpace = styled.div`
  margin-top: 30px;
`;
