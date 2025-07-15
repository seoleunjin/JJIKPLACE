import { instance } from "./apiClient";

const StoreDetailApi = (ps_id: number) => {
  return instance.get(`/studios/${ps_id}`);
};

const ImageGalleryApi = (ps_id: number, page: number) => {
  return instance.get(`/studios/${ps_id}/images/?page=${page}`);
};

export { StoreDetailApi, ImageGalleryApi };
