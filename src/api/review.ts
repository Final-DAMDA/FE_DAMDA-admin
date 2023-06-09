import { ReviewPostReq, ReviewRes } from '@/types/api/review';
import { instance, multipartInstance } from './instance';

export const getReviews = async (page?: number) => {
  const params = {
    page: page ? page : 0,
    size: 10,
  };
  const res = await instance.get<ReviewRes>('/admin/review/list', { params });
  return res.data;
};

export const postReviewAutoData = async (reservationId: number, formData: FormData) => {
  const res = await multipartInstance.post(`/review/auto/${reservationId}`, formData);
  return res.data;
};

export const postReviewManual = async (formData: FormData) => {
  const res = await multipartInstance.post('/review/manual', formData);
  return res.data;
};

export const deleteReview = async (reviewId: number) => {
  const res = await instance.delete(`/review/${reviewId}`);
  return res.data;
};

export const selectBestReview = async (reviewId: number) => {
  const res = await instance.put(`/review/best/${reviewId}`);
  return res.data;
};

export const deleteReviewImage = async (imageId: number) => {
  const res = await instance.delete(`/review/image/${imageId}`);
  return res.data;
};
