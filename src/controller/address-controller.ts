import { NextFunction, Request, Response } from "express";
import { AddressService } from "../service/address-service";
import { CreateAddressRequest, DeleteAddressRequest, UpdateAddressRequest } from "../model/address-model";
import { UserRequest } from "../type/user-request";

export class AddressController {

  static async create(req:UserRequest , res: Response, next: NextFunction) {
    try {
      const request: CreateAddressRequest = req.body as CreateAddressRequest
      request.userId = Number(req.params.userId)
      const response = await AddressService.create(req.user!, request)

      res.status(200).json({
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  static async get(req: Request, res: Response, next: NextFunction){

  }

  static async update(req:UserRequest , res: Response, next: NextFunction) {
    try {
      const request: UpdateAddressRequest = req.body as UpdateAddressRequest
      request.id = Number(req.params.addressId)
      request.userId = Number(req.params.userId)
      const response = await AddressService.update(req.user!, request)

      res.status(200).json({
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

   static async delete(req: UserRequest, res: Response, next: NextFunction) {
      try {
        const request: DeleteAddressRequest = {
          id: Number(req.params.addressId),
          userId: Number(req.params.userId)
        }
        await AddressService.remove(req.user!,request)
        res.status(200).json({
          data: "OK",
        });
      } catch (error) {
        next(error);
      }
    }
  
}