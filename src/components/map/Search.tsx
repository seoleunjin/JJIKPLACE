import { getMapSearch } from "@/api/map";
import { MarkerType } from "@/types/map";
import { useState } from "react";

interface MapSearchProps {
  onSelectPosition: (pos: { lat: number; lng: number }) => void;
}

function MapSearch({ onSelectPosition }: MapSearchProps) {
  const [value, setValue] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState<MarkerType[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = async () => {
    const keyword = value.trim().toLowerCase();
    if (!keyword) {
      alert("검색어를 입력해주세요");
      return;
    }

    const bounds = {
      swLat: 33.0,
      swLng: 124.0,
      neLat: 39.5,
      neLng: 132.0,
    };

    try {
      const response = await getMapSearch(bounds);
      const markers = response.data.markers;

      const filtered = markers.filter((marker: MarkerType) => {
        const name = marker.name?.toLowerCase() || "";
        const addr = marker.road_addr?.toLowerCase() || "";
        return name.includes(keyword) || addr.includes(keyword);
      });
      setFilteredMarkers(filtered);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="매장명을 입력하세요"
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <button onClick={handleSearch}>검색</button>

      {filteredMarkers.length > 0 && (
        <ul>
          {filteredMarkers.slice(0, 5).map((marker) => (
            <li
              key={marker.id}
              style={{ cursor: "pointer" }}
              onClick={() =>
                onSelectPosition({ lat: marker.lat, lng: marker.lng })
              }
            >
              <strong>{marker.name}</strong> - {marker.road_addr}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MapSearch;
