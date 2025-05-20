import { ReviewProps } from '@/types/Review.types';
import { api } from '@/utils/api';

export const submitReview = async (payload: ReviewProps) => {
  const { data, success, message } = await api.post('main/review', payload);
  if (!success) {
    throw new Error(message || '리뷰 제출 실패');
  }
  return data;

  
};
