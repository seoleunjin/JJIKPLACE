import { jwtDecode } from "jwt-decode";

export default function DecodingInfo(token: string) {
  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("JWT decode 실패", err);
    return null;
  }
}
