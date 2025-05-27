import express from "express"
import { AddressController } from "../controller/address-controller"
import { authMiddleware } from "../middleware/auth-middleware"

export const addressRouter = express.Router()
addressRouter.use(authMiddleware)


addressRouter.post('/api/users/:userId/addresses', AddressController.create)
addressRouter.get('/api/users/:userId/addresses/:addressId', AddressController.get)
addressRouter.put('/api/users/:userId/addresses/:addressId', AddressController.update)
addressRouter.delete('/api/users/:userId/addresses/:addressId', AddressController.delete)