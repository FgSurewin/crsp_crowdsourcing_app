import styled, { css } from "styled-components/macro";
import { lessThan, SMALL, REM } from "../../style/helper";
import Button from "@material-ui/core/Button";

export const HeaderWrapper = styled.header`
  /* width: 100vw; */
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* overflow-x: hidden; */
`;

export const HeaderVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: 0;
`;

export const Shade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgba(196, 196, 196, 0.29);
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: translateY(-20%);
  z-index: 12;
  ${lessThan(
    SMALL,
    css`
      transform: translateY(0%);
    `
  )}
`;

export const HeaderTitleBox = styled.div`
  text-align: center;
  text-transform: uppercase;
  margin-bottom: ${REM(14)};
`;
export const HeaderTitle = styled.h2`
  color: white;
  font-weight: bold;
  font-size: ${REM(48)};
  ${lessThan(
    SMALL,
    css`
      font-size: ${REM(34)};
    `
  )}
`;
export const HeaderSubtitleBox = styled.div`
  margin-bottom: ${REM(36)};
`;
export const HeaderSubtitle = styled.p`
  color: white;
  font-weight: bold;
  font-size: ${REM(18)};
  padding: ${REM(4)} 0;
  text-align: center;
  ${lessThan(
    SMALL,
    css`
      font-size: ${REM(14)};
    `
  )}
`;

export const HeaderIcon = styled.img`
  z-index: 12;
  display: block;
  position: absolute;
  bottom: ${REM(30)};
  left: 50%;
  transform: translateX(-50%);
  ${lessThan(
    SMALL,
    css`
      width: 5%;
    `
  )}
`;

export const HeaderButton = styled(Button)`
  background-color: ${(props) => props.theme.primaryColor} !important;
  color: white !important;
  padding: ${REM(7)} ${REM(36)} !important;
  font-weight: 500 !important;
  font-size: ${REM(24)} !important;
  ${lessThan(
    SMALL,
    css`
      font-size: ${REM(20)} !important;
      padding: ${REM(3)} ${REM(24)} !important;
    `
  )}
`;
