import express from "express"
import { ProductController } from "../controller/product-controller"

export const productRouter = express.Router()

productRouter.post('/api/products', ProductController.create)
// productRouter.get('/api/products', ProductController.get)
productRouter.get('/api/products/:productId', ProductController.get)
productRouter.put('/api/products/:productId', ProductController.update)
productRouter.delete('/api/products/:productId', ProductController.delete)  
