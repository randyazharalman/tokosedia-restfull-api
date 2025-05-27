import express from "express";
import { ShippingController } from "../controller/shipping-controller";
import { authMiddleware } from "../middleware/auth-middleware";

export const shippingRouter = express.Router();
shippingRouter.use(authMiddleware);


shippingRouter.post('/api/shippings', ShippingController.create)
shippingRouter.get('/api/shippings/:shippingId', ShippingController.get);
shippingRouter.put('/api/shippings/:shippingId', ShippingController.update);
shippingRouter.delete('/api/shippings/:shippingId', ShippingController.delete);
// shippingRouter.get('/api/shippings', (req, res, next) => shippingController.list(req, res, next));
