import express from "express"
import { CartController } from "../controller/cart-controller";
import { CartItemController } from "../controller/cart-item-controller";

export const cartRouter = express.Router();

//  CART
cartRouter.post('/api/users/:userId/carts', CartController.create)
cartRouter.get('/api/users/:userId/carts', CartController.get)

// CART ITEM
cartRouter.post('/api/cart/items', CartItemController.create)
cartRouter.put('/api/cart/items', CartItemController.update)
cartRouter.delete('/api/cart/items', CartItemController.delete)
