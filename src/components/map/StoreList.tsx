import { useAppSelector } from "@/hooks/storeMap";

function StoreList() {
  const { markers } = useAppSelector((state) => state.map);
  console.log("리스트", markers);
  return (
    <div>
      <ul>
        {markers.map((marker, id) => (
          <li key={marker.id}>
            <div></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoreList;
