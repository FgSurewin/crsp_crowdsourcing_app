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
  /* width: 720px;
  height: 480px; */
  width: 640px;
  height: 640px;
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

const getColor = (type) => {
  let result = "";
  switch (type) {
    case "door":
      result = "#F97F51";
      break;
    case "knob":
      result = "#9AECDB";
      break;
    case "ramp":
      result = "#EAB543";
      break;
    case "stairs":
      result = "#D6A2E8";
      break;
    default:
      break;
  }
  return result;
};

export const SingleMarkerInnerWrapper = styled.section`
  background-color: ${(props) => getColor(props.targetType)};
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
export const SingleMarkerInnerContainer = styled.div`
  position: relative;
  top: -570%;
  left: -300%;
  background-color: white;
  width: 150px;
  height: 100px;
  border-radius: 4px;
  padding: 10px;
`;
export const SingleMarkerInnerText = styled.p`
  /* font-weight: bolder; */
  font-size: 14px;
`;
