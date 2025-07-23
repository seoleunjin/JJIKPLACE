import commonStyles from "@/styles/common.module.css";
import { setEndPoint, setStartPoint } from "@/features/map/mapSlice";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/storeMap";

interface NaviButtonProps {
  lat: number;
  lng: number;
  name: string;
}

function NaviButton({ lat, lng, name }: NaviButtonProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleStartPoint = (lat: number, lng: number, name: string) => {
    dispatch(setStartPoint({ lat, lng, name }));
    router.push({
      pathname: "/map/navigation",
      query: {
        startLat: lat.toString(),
        startLng: lng.toString(),
        startName: name,
      },
    });
  };

  const handleEndPoint = (lat: number, lng: number, name: string) => {
    dispatch(setEndPoint({ lat, lng, name }));
    router.push({
      pathname: "/map/navigation",
      query: {
        endLat: lat.toString(),
        endLng: lng.toString(),
        endName: name,
      },
    });
  };
  return (
    <div className={commonStyles.naviButton}>
      <button
        type="button"
        onClick={() => handleStartPoint(lat, lng, name)}
        className={commonStyles.btnBrand}
      >
        출발
      </button>
      <button
        type="button"
        onClick={() => handleEndPoint(lat, lng, name)}
        className={commonStyles.btnBrandFill}
      >
        도착
      </button>
    </div>
  );
}

export default NaviButton;
