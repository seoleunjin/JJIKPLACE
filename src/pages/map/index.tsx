import { Map } from "react-kakao-maps-sdk";
import useKakaoLoader from "@/components/map/useKakaoLoaderOrigin";

export default function KakaoMap() {
  const scriptLoad = useKakaoLoader();

  return (
    <div>
      {scriptLoad ? (
        <Map
          id="map"
          center={{
            lat: 35.870988,
            lng: 128.594024,
          }}
          style={{
            width: "100%",
            height: "100vh",
          }}
          level={3}
        />
      ) : (
        <div>지도 로딩중</div>
      )}
    </div>
  );
}
