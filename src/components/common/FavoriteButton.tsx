import { useAppDispatch, useAppSelector } from "@/hooks/storeMap";
import styles from "@/styles/storeList.module.css";
import { Heart } from "@/assets/icons";
import { toggleFavorite } from "@/api/map";
import { MarkerType } from "@/types/map";
import { setMarkers } from "@/features/map/mapSlice";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

type FavoriteButtonProps = {
  marker: MarkerType;
};

function FavoriteButton({ marker }: FavoriteButtonProps) {
  const route = useRouter();
  const { markers } = useAppSelector((state) => state.map);
  const dispatch = useAppDispatch();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      setAccessToken(token);
    }
  }, []);

  const handleFavoriteClick = async (marker: MarkerType) => {
    const currentFavorite = marker.is_favorite;
    const newFavorite = !currentFavorite;
    try {
      await toggleFavorite(marker.id, newFavorite);

      const updatedMarkers = markers.map((m) =>
        m.id === marker.id ? { ...m, is_favorite: newFavorite } : m,
      );
      dispatch(setMarkers(updatedMarkers));
    } catch (e) {
      const axiosError = e as AxiosError;
      console.error("찜 토글 실패", axiosError);
      if (accessToken === null) {
        alert("로그인 후 이용해주세요");
        route.replace("/auth/login");
      }
    }
  };

  return (
    <div>
      {accessToken && (
        <button
          className={marker.is_favorite ? styles.heartBtnAc : styles.heartBtn}
          onClick={() => handleFavoriteClick(marker)}
        >
          <Heart />
        </button>
      )}
    </div>
  );
}

export default FavoriteButton;
