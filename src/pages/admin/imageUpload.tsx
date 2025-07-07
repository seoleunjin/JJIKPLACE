import { ImagesUpload } from "@/api/admin";
import Image from "next/image";
import { useState, ChangeEvent, useEffect } from "react";

function AdminPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [psId, setPsId] = useState<string>("");

  const handleChangePsId = (e: ChangeEvent<HTMLInputElement>) => {
    setPsId(e.target.value);
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      console.log("파일 갯수", selectedFiles.length);

      const previews = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls(previews);
    }
  };

  const handleUpload = async () => {
    if (!psId) {
      alert("상점 ID를 입력하세요.");
      return;
    }

    if (files.length === 0) {
      alert("업로드할 파일을 선택하세요.");
      return;
    }

    try {
      const res = await ImagesUpload(psId, files);
      console.log("업로드 성공", res);
      alert("업로드 성공!");
    } catch (err) {
      console.error("업로드 실패", err);
      alert("업로드 실패. 콘솔을 확인하세요.");
    }
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

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
        multiple
        onChange={handleChangeFile}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <button onClick={handleUpload}>업로드</button>

      {/* 이미지 미리보기 영역 */}
      <div>
        {previewUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`preview`}
            width={80}
            height={80}
            unoptimized
          />
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
