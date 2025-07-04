import { useAppSelector } from "@/hooks/storeMap";

function StoreList() {
  const { markers } = useAppSelector((state) => state.map);
  const category = useAppSelector((state) => state.map.category);
  return (
    <div>
      <ul>
        {markers.slice(0, 6).map((marker) => (
          <li key={marker.id}>
            <div>{/* 이미지 */}</div>
            <div>
              <div>
                <h6>{marker.name}</h6>
                <p>찜</p>
              </div>
              <div>{/* 거리 */}</div>
              <div>
                <div>{marker.review_avg_score}</div>
                <div>{marker.review_cnt}</div>
              </div>
              <div>{category}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoreList;
