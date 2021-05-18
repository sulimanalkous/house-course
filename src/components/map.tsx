import { useRef, useState } from "react";
import Link from "next/link";
import { Image } from "cloudinary-react";
// @ts-ignore
import ReactMapGL, { Marker, Popup, ViewState } from "react-map-gl";

interface IProps {}

interface IViewStates {
  latitude: number;
  longitude: number;
  zoom: number;
}

export default function Map({}: IProps) {
  // @ts-ignore
  const mapRef = useRef<ReactMapGL | null>(null);
  const [viewport, setViewport] = useState<ViewState>({
    latitude: 29.3759,
    longitude: 47.9774,
    zoom: 10,
  });

  return (
    <div className="text-black relative">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 64px)"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onViewportChange={(nextViewport: IViewStates) => setViewport(nextViewport)}
        ref={(instance) => (mapRef.current = instance)}
        minZoom={5}
        maxZoom={15}
        mapStyle="mapbox://styles/sulimanalkous/ckot955e6027317ms1x4t67oo"
      />
    </div>
  );
}
