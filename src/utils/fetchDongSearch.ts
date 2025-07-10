// utils/fetchDongSearch.ts
import axios from "axios";

export async function fetchDongSearch(keyword: string) {
  if (!keyword || keyword.trim() === "") return [];

  try {
    const res = await axios.get(`/api/search-dong`, {
      params: { keyword },
    });

    return res.data.items || [];
  } catch (error) {
    console.error("⛔ 검색 실패:", error);
    return [];
  }
}
