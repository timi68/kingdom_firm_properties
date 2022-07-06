import React from "react";
import GoogleMap from "google-map-react";

function Map() {
  const [center, setCenter] = React.useState();
  const coordinates = { lat: 0, lng: 0 };

  return (
    <GoogleMap
      bootstrapURLKeys={{ key: "AIzaSyAbMUG-2NiHydmH3ZvyoidAfD7ee3WLons" }}
      defaultCenter={coordinates}
      center={coordinates}
      defaultZoom={14}
      margin={[50, 50, 50, 50]}
    />
  );
}

export default Map;
