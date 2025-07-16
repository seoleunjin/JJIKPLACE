import React, { useEffect, useState } from "react";
import FormSubmitBtn from "@/components/common/FormSubmitBtn";
import { pageMeta } from "@/constants/pageMeta";
import layoutStyles from "@/styles/layout.module.css";
import writeReviewStyles from "@/styles/writeReview.module.css";
import { createReview } from "@/api/user";
import CountStar from "@/components/common/CountStar";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

const WriteReviewForm = () => {
  const router = useRouter();
  const { store, name } = router.query;
  const decodedName = decodeURIComponent(name as string);
  console.log(decodedName);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState("");
  const [psId] = useState(store);

  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("rating", String(rating));
      formData.append("content", content);
      formData.append("ps_id", String(psId));

      await createReview(formData);
      alert("리뷰 등록이 완료 되었습니다.");
      router.push("/user");
      // console.log("리뷰 등록 성공:", res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          alert("세션이 만료 되었습니다. 다시 로그인 해주세요.");
          localStorage.removeItem("accessToken");
          router.push("/auth/login");
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  // 이미지 미리보기
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string); // Data URL로 변환
    };
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  return (
    <form style={{ paddingTop: "60px" }} onSubmit={submitReview}>
      <div
        className={`${layoutStyles.width} ${writeReviewStyles.point_section}`}
      >
        <p>
          <span>{decodedName}</span>은 어떠셨나요?
        </p>
        <CountStar value={rating} onChange={setRating}></CountStar>
      </div>
      <p className={writeReviewStyles.line}></p>
      <div
        className={`${layoutStyles.width} ${writeReviewStyles.text_section}`}
      >
        <p>자세한 사진관 리뷰를 작성해주세요.</p>
        {previewUrl && (
          <div style={{ margin: "10px 0" }}>
            <Image
              src={previewUrl}
              alt="선택한 리뷰 이미지 미리보기"
              width={150}
              height={150}
            />
          </div>
        )}
        <textarea
          placeholder="방문하셨을 때의 분위기를 자세히 남겨주시면 다른 고객분들에게 좋은 참고가 됩니다."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <label
          htmlFor="review-image"
          className={writeReviewStyles.photo_add_btn}
        >
          사진 등록하기
        </label>
        <input
          id="review-image"
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.webp"
          style={{ display: "none" }}
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
      </div>

      <FormSubmitBtn title={"등록하기"} disabled={!rating || !content} />
    </form>
  );
};

export default WriteReviewForm;
WriteReviewForm.title = pageMeta.writeReview.title;
