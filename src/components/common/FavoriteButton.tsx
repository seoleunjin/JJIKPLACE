import { useAppDispatch, useAppSelector } from "@/hooks/storeMap";
import styles from "@/styles/common.module.css";
import { Heart } from "@/assets/icons";
import { toggleFavorite } from "@/api/map";
import { setMarkers } from "@/features/map/mapSlice";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

interface MinimalFavorite {
  id: number;
  is_favorite: boolean;
}

interface FavoriteButtonProps {
  favorite: MinimalFavorite;
}

function FavoriteButton({ favorite }: FavoriteButtonProps) {
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

  const handleFavoriteClick = async (favorite: MinimalFavorite) => {
    const currentFavorite = favorite.is_favorite;
    const newFavorite = !currentFavorite;
    try {
      await toggleFavorite(favorite.id, newFavorite);

      const updatedMarkers = markers.map((m) =>
        m.id === favorite.id ? { ...m, is_favorite: newFavorite } : m,
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
          className={favorite.is_favorite ? styles.heartBtnAc : styles.heartBtn}
          onClick={() => handleFavoriteClick(favorite)}
        >
          <Heart />
        </button>
      )}
    </div>
  );
}

export default FavoriteButton;
