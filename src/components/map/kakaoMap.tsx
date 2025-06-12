import useKakaoLoader from "@/components/map/useKakaoLoaderOrigin";
import { Map } from "react-kakao-maps-sdk";

function KakaoMap() {
  useKakaoLoader();

  return (
    <div>
      <Map
        id="map"
        center={{ lat: 35.869601, lng: 128.593139 }}
        style={{ width: "100%", height: "100vh" }}
      ></Map>
    </div>
  );
}

export default KakaoMap;
