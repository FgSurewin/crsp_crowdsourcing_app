import styled from "styled-components/macro";
export const OriginalMapWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
`;

export const StreetViewWindow = styled.div`
  width: 100%;
  height: 100%;
`;

export const OnlyStreetViewContainer = styled.div`
  position: relative;
  align-self: flex-end;
  width: 100vw;
  height: 100vh;
  /* overflow: hidden; */
`;

export const StreetViewShade = styled.div`
  position: absolute;
  align-self: flex-end;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  border-color: rgba(0, 0, 0, 0.8);
`;

export const InstructionItem = styled.div`
  height: 450px;
  padding: 0px 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bolder;
  color: ${(props) => props.theme.primaryFont};
  ${(props) => props.small && `font-size: 14px;`}
  ${(props) => props.down && `padding-top: 40px;`}
`;

export const UploadProgressContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
`;
