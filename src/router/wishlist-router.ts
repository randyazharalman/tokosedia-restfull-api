import express from "express";
import { WishlistController } from "../controller/wishlist-controller";


export const wishlistRouter = express.Router()

wishlistRouter.get('/api/users/:userId/wishlist', WishlistController.get)
wishlistRouter.post('/api/users/:userId/wishlist', WishlistController.create)
wishlistRouter.delete('/api/users/:userId/wishlist', WishlistController.delete)