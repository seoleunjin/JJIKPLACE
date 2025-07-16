import { useEffect, useState, useCallback } from "react";
import { XMLParser } from "fast-xml-parser";

interface RegionResult {
  locatadd_nm: string;
  region_cd: string;
}

function SearchT() {
  const serviceKey =
    "vROaCiD4BajppH2wH9Ac7Ecnw%2B2KnhL%2BL16O6wz3AozSg4AKNLfIyjzIw1tLHoaiLUu0%2Fy3pnEzG83sHXOpz%2BA%3D%3D";

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<RegionResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchAddress = useCallback(async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    const url = `https://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?serviceKey=${serviceKey}&locatadd_nm=${encodeURIComponent(
      query,
    )}&_type=xml&numOfRows=100`;

    try {
      const res = await fetch(url);
      const xmlText = await res.text();

      const parser = new XMLParser();
      const json = parser.parse(xmlText);

      const rows = json?.StanReginCd?.row;
      const list = Array.isArray(rows) ? rows : rows ? [rows] : [];

      setResults(list);
      console.log("검색", res);
    } catch (e) {
      setError("검색 중 오류가 발생했습니다.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [query]); // 의존성 배열에 query 추가

  useEffect(() => {
    searchAddress(); // 이제 안전하게 의존성 배열에 넣을 수 있음
  }, [searchAddress]);

  return (
    <div style={{ maxWidth: 600, margin: "auto", paddingTop: "200px" }}>
      <h2>주소 검색</h2>
      <input
        type="text"
        placeholder="검색할 주소명을 입력하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "80%", padding: 8, marginRight: 8 }}
      />
      <button onClick={searchAddress} disabled={loading}>
        {loading ? "검색 중..." : "검색"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.length === 0 && !loading && <li>검색 결과가 없습니다.</li>}
        {results.map((item, idx) => (
          <li key={idx}>
            <strong>{item.locatadd_nm}</strong> — 코드: {item.region_cd}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchT;
