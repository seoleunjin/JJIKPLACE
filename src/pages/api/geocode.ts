// pages/api/geocode.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { address } = req.query;

  if (!address || typeof address !== "string") {
    return res.status(400).json({ error: "유효하지 않은 주소입니다." });
  }

  const key = process.env.NEXT_PUBLIC_VWORLD_KEY;

  const apiUrl = `https://api.vworld.kr/req/address?service=address&request=getCoord&key=${key}&format=json&type=road&address=${encodeURIComponent(
    address,
  )}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "서버 에러", detail: String(error) });
  }
}
