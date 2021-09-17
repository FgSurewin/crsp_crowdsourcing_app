import React from "react";
import StreetViewOnly from "../../components/StreetViewOnly";
import { generateStreetOption } from "./utils";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CapturePage() {
  // Redux
  const { location, pov, pano } = useSelector((state) => state.streetView);
  // Router
  const history = useHistory();

  // Prevent user refresh the page
  if (pano === null) {
    history.push("/streetView");
    return <div>Wrong Page</div>;
  }
  return (
    <div>
      <StreetViewOnly
        api={process.env.REACT_APP_API_KEY}
        streetViewOptions={generateStreetOption(
          location.lat,
          location.lng,
          pov.heading,
          pov.pitch
        )}
      />
    </div>
  );
}
