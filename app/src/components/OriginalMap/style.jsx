import styled from "styled-components";

export const OriginalMapWrapper = styled.div`
  display: flex;
`;

export const MapContainer = styled.div`
  position: relative;
  align-self: flex-end;
  width: 200px;
  height: 200px;
`;

export const Shade = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

export const SmallMap = styled.div`
  width: 100%;
  height: 100%;
`;

export const StreetViewContainer = styled.div`
  position: relative;
  align-self: flex-end;
  width: 720px;
  height: 480px;
  overflow: hidden;
`;

export const StreetViewWindow = styled.div`
  width: 100%;
  height: 100%;
`;

export const LabelPanel = styled.div`
  z-index: 5;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;
