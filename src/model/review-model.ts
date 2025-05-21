import { Review } from "@prisma/client";
import { GetAddressRequest } from "./address-model";

export type ReviewResponse = {
  id: number;
  reviewerName: string;
  reviewerEmail: string;
  comment: string;
  rating: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  productId: number;
  userId: number;
};

export type GetReviewRequest = {
  id: number;
  productId: number;
};

export type CreateReviewRequest = {
  reviewerName: string;
  reviewerEmail: string;
  comment: string;
  rating: number;
  date: string;
  productId: number;
  userId: number;
};

export type UpdateReviewRequest = Partial<CreateReviewRequest> & { id: number };

export type DeleteReviewRequest = GetAddressRequest;

export function toReviewResponse(review: Review): ReviewResponse {
  return {
    id: review.id,
    reviewerName: review.reviewerName,
    reviewerEmail: review.reviewerEmail,
    comment: review.comment,
    rating: review.rating,
    date: review.date.toISOString(),
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
    productId: review.productId,
    userId: review.userId,
  };
}
