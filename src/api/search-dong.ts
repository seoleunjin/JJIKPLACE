// pages/api/search-dong.ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { keyword } = req.query;

  if (!keyword || typeof keyword !== "string") {
    return res.status(400).json({ error: "Missing or invalid keyword" });
  }

  const serviceKey =
    "vROaCiD4BajppH2wH9Ac7Ecnw+2KnhL+L16O6wz3AozSg4AKNLfIyjzIw1tLHoaiLUu0/y3pnEzG83sHXOpz+A==";
  const apiUrl = `https://apis.data.go.kr/1741000/StanReginCd`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        serviceKey,
        type: "json",
        locatadd_nm: keyword,
      },
    });

    const items = response.data?.StanReginCd?.row || [];
    res.status(200).json({ items });
  } catch (error) {
    console.error("공공데이터 API 호출 실패:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
