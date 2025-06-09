import { useEffect, useState } from "react";
import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

export default function useKakaoLoader() {
  const [loaded, setLoaded] = useState(false);

  useKakaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY || "",
    libraries: ["clusterer", "drawing", "services"],
  });

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setLoaded(true);
    }
  }, []);

  return loaded;
}
