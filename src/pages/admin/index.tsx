import { ThumbnailApi } from "@/api/admin";
import { useState, ChangeEvent } from "react";

function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [psId, setPsId] = useState<string>("");

  // 상점 ID 입력 핸들러
  const handleChangePsId = (e: ChangeEvent<HTMLInputElement>) => {
    setPsId(e.target.value);
  };

  // 파일 선택 핸들러
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // 업로드 버튼 클릭 핸들러
  const handleUpload = async () => {
    if (!psId) {
      alert("상점 ID를 입력하세요.");
      return;
    }

    if (!file) {
      alert("업로드할 파일을 선택하세요.");
      return;
    }

    try {
      const res = await ThumbnailApi(psId, file);
      console.log("업로드 성공", res);
      alert("업로드 성공!");
    } catch (err) {
      console.error("업로드 실패", err);
      alert("업로드 실패. 콘솔을 확인하세요.");
    }
  };

  return (
    <div style={{ paddingTop: "200px" }}>
      <input
        type="text"
        placeholder="상점 ID를 입력하세요"
        value={psId}
        onChange={handleChangePsId}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleChangeFile}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <button onClick={handleUpload}>업로드</button>
    </div>
  );
}

export default AdminPage;
