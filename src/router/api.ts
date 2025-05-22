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

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

// USER
apiRouter.get('/api/users/current', UserController.get)
apiRouter.patch('/api/users/current', UserController.update)
apiRouter.delete('/api/users/current', UserController.logout)


// PRODUCT
apiRouter.post('/api/products', ProductController.create)
// apiRouter.get('/api/products', ProductController.get)
apiRouter.get('/api/products/:productId', ProductController.get)
apiRouter.put('/api/products/:productId', ProductController.update)
apiRouter.delete('/api/products/:productId', ProductController.delete)  


// ADDRESS
apiRouter.post('/api/users/:userId/addresses', AddressController.create)
apiRouter.get('/api/users/:userId/addresses/:addressId', AddressController.get)
apiRouter.put('/api/users/:userId/addresses/:addressId', AddressController.update)
apiRouter.delete('/api/users/:userId/addresses/:addressId', AddressController.delete)

// REVIEW
apiRouter.post('/api/reviews', ReviewController.create)
apiRouter.get('/api/products/:productId/reviews', ReviewController.get)
apiRouter.put('/api/reviews/:reviewId', ReviewController.update)
apiRouter.delete('/api/reviews/:reviewId', ReviewController.delete)

// CATEGORIES
// apiRouter.get('/api/categories');
// apiRouter.post('/api/categories');
// apiRouter.get('/api/categories/:categoriesId')
// apiRouter.put('/api/categories/:categoriesId')
// apiRouter.delete('/api/categories/:categoriesId')

//  CART
apiRouter.post('/api/users/:userId/carts', CartController.create)
apiRouter.get('/api/users/:userId/carts', CartController.get)

// CART ITEM
apiRouter.post('/api/cart/items', CartItemController.create)
apiRouter.put('/api/cart/items', CartItemController.update)
apiRouter.delete('/api/cart/items', CartItemController.delete)


// WISHLIST
apiRouter.get('/api/users/:userId/wishlist', WishlistController.get)
apiRouter.post('/api/users/:userId/wishlist', WishlistController.create)
apiRouter.delete('/api/users/:userId/wishlist', WishlistController.delete)

// ACTIVITY LOG
apiRouter.get('/api/users/:userId/activity-logs', ActivityLogController.get)
apiRouter.post('/api/users/:userId/activity-logs', ActivityLogController.create)
apiRouter.delete('/api/users/:userId/activity-logs', ActivityLogController.delete)


// TRANSACTION
apiRouter.get('/api/users/:userId/transactions', TransactionController.getByUserId)
apiRouter.post('/api/users/:userId/transactions', TransactionController.create)
apiRouter.put('/api/transactions/:transactionId', TransactionController.update)
apiRouter.delete('/api/transactions/:transactionId', TransactionController.delete)
