import styled, { css } from "styled-components/macro";
import Background from "../../images/Group1.png";
import Button from "@material-ui/core/Button";
import { REM } from "../../style/helper";

export const ExplorationWrapper = styled.section`
  /* background: url(${Background}) no-repeat; */
  background: #fbf8f5;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ExplorationContainer = styled.div`
  width: 1236px;
  /* margin-left: 30px; */
  display: flex;
  justify-content: space-between;
`;

export const ExplorationPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  transform: translateX(-30%);
`;

export const ExplorationCover = styled.div``;

export const ExplorationShowcase = styled.div`
  margin-top: 20px;
  width: 421px;
  border: 2px solid #3f3d56;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

export const ShowcaseText = styled.span`
  ${(props) =>
    props.finished === "true" &&
    css`
      text-decoration-line: line-through;
    `}
`;

export const ShowcaseButton = styled(Button)`
  padding: 6px 45px !important;
  font-size: 14px !important;
  /* margin-left: 10px !important; */
  font-weight: bolder !important;
  ${(props) =>
    props.finished === "true"
      ? css`
          background: #d0b89c !important;
          color: #3f3d56 !important;
        `
      : css`
          background: #abd1c6 !important;
          color: #fff !important;
        `}
`;

export const NextButton = styled(Button)`
  background-color: ${(props) => props.theme.primaryColor} !important;
  color: white !important;
  padding: ${REM(5)} ${REM(100)} !important;
  font-weight: 500 !important;
  font-size: ${REM(18)} !important;
  align-self: right;
  /* justify-self: right; */
`;
