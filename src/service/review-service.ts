import { User } from "@prisma/client";
import { prisma } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateReviewRequest,
  ReviewResponse,
  toReviewResponse,
  UpdateReviewRequest,
} from "../model/review-model";
import { ReviewValidation } from "../validation/review-validation";
import { Validation } from "../validation/validation";

export class ReviewService {
  static async create(request: CreateReviewRequest): Promise<ReviewResponse> {
    const CreateReviewRequest = Validation.validate(
      ReviewValidation.CREATE,
      request
    );

    const review = await prisma.review.create({
      data: CreateReviewRequest,
    });

    return toReviewResponse(review);
  }
  static async get(id: number): Promise<ReviewResponse> {
    const review = await prisma.review.findFirst({
      where: {
        productId: Number(id),
      },
    });

    if (!review) {
      throw new ResponseError(404, "Review not found");
    }

    return toReviewResponse(review);
  }
  static async update(
    user: User,
        request: UpdateReviewRequest
  ): Promise<ReviewResponse> {
    const UpdateReviewRequest = Validation.validate(
      ReviewValidation.UPDATE,
      request
    );

    const review = await prisma.review.update({
      where: {
        id: UpdateReviewRequest.id,
      },
      data: UpdateReviewRequest,
    });

    return toReviewResponse(review);
  }
  static async remove(id: number): Promise<ReviewResponse> {
    if (isNaN(id)) {
      throw new ResponseError(400, "Invalid review ID");
    }

    const review = await prisma.review.delete({
      where: {
        id: Number(id),
      },
    });

    if (!review) {
      throw new ResponseError(404, "Review not found");
    }

    return toReviewResponse(review);
  }
}
