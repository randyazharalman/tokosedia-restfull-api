import express from "express"
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-contolerr";
import { ProductController } from "../controller/product-controller";
import { AddressController } from "../controller/address-controller";
import { ReviewController } from "../controller/review-controller";
import { CartController } from "../controller/cart-controller";
import { CartItemController } from "../controller/cart-item-controller";
import { WishlistController } from "../controller/wishlist-controller";
import { ActivityLogController } from "../controller/activity-log-controller";
import { TransactionController } from "../controller/transaction-controller";
import { shippingRouter } from "./shipping-router";
import { paymentRouter } from "./payment-router";
import { wishlistRouter } from "./wishlist-router";
import { userRouter } from "./user-router";
import { addressRouter } from "./address-router";
import { productRouter } from "./product-router";
import { activityLogRouter } from "./activity-log-router";
import { cartRouter } from "./cart-router";
import { reviewRouter } from "./review-router";
import { transactionRouter } from "./transaction-router";

export const apiRouter = express.Router(); 

apiRouter.use(authMiddleware);
apiRouter.use(userRouter);
apiRouter.use(addressRouter);
apiRouter.use(productRouter);
apiRouter.use(shippingRouter);
apiRouter.use(paymentRouter);
apiRouter.use(wishlistRouter);
apiRouter.use(activityLogRouter);
apiRouter.use(cartRouter);
apiRouter.use(reviewRouter);
apiRouter.use(transactionRouter)
