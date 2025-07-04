import { useAppSelector } from "@/hooks/storeMap";
import { useRouter } from "next/router";

export default function StoreCard() {
  const { markers } = useAppSelector((state) => state.map);
  const router = useRouter();

  const id = parseInt(router.query.id as string, 10);
  const selectedStore = markers.find((marker) => marker.id === id);

  if (!selectedStore) return null;

  return (
    <div className="store-card">
      <h3>{selectedStore.name}</h3>
      <p>{selectedStore.road_addr}</p>
      <p>리뷰 수: {selectedStore.review_cnt}</p>
      <p>평점: {selectedStore.review_avg_score}</p>
    </div>
  );
}
