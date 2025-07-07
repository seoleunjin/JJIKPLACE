// api/admin.ts
import { userInstance } from "./apiClient";

const ThumbnailApi = (ps_id: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return userInstance.post(`/studios/${ps_id}/thumbnail`, formData);
};

const ImagesUpload = (ps_id: string, files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files[]", file);
  });

  return userInstance.post(`/studios/${ps_id}/images`, formData);
};

export { ThumbnailApi, ImagesUpload };
