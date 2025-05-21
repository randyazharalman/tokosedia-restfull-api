import { prisma } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateWishlistRequest,
  DeleteWishlistRequest,
  GetWishlistRequest,
  toWishlistResponse,
  WishlistResponse,
} from "../model/wishlist-model";
import { Validation } from "../validation/validation";
import { WishlistValidation } from "../validation/wishlist-validation";

export class WishlistService {
  static async create(
    request: CreateWishlistRequest
  ): Promise<WishlistResponse> {
    const createWishlistRequest = Validation.validate(
      WishlistValidation.CREATE,
      request
    );

    const existing = await prisma.wishlist.findUnique({
      where: { userId: request.userId },
    });
    const productConnect = createWishlistRequest.items.map((id) => ({ id }));

    const wishlist = existing
      ? await prisma.wishlist.update({
          where: { userId: createWishlistRequest.userId },
          data: { items: { set: productConnect } },
          include: { items: true },
        })
      : await prisma.wishlist.create({
          data: {
            userId: createWishlistRequest.userId,
            items: { connect: productConnect },
          },
          include: { items: true },
        });
    console.log(wishlist);
    return toWishlistResponse(wishlist);
  }

  static async get(request: GetWishlistRequest): Promise<WishlistResponse> {
    const getWishRequest = Validation.validate(WishlistValidation.GET, request);
    const wishlist = await prisma.wishlist.findUnique({
      where: {
        userId: getWishRequest.userId,
      },
      include: {
        items: true,
      },
    });

    if (!wishlist) throw new ResponseError(404, "Wishlist not found");
    return toWishlistResponse(wishlist);
  }

  static async remove(
    request: DeleteWishlistRequest
  ): Promise<WishlistResponse> {
    const deleteWishlistRequest = Validation.validate(
      WishlistValidation.DELETE,
      request
    );
    const wishlist = await prisma.wishlist.delete({
      where: {
        userId: deleteWishlistRequest.userId,
      },
      include: {
        items: true,
      },
    });

    if (!wishlist) throw new ResponseError(404, "Wishlist not found");
    return toWishlistResponse(wishlist);
  }
}
