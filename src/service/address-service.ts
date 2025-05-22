import { User } from "@prisma/client";
import { prisma } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  AddressResponse,
  CreateAddressRequest,
  DeleteAddressRequest,
  toAddressResponse,
  UpdateAddressRequest,
} from "../model/address-model";
import { AddressValidation } from "../validation/address-validation";
import { Validation } from "../validation/validation";

export class AddressService {
  static async create(
    user: User,
    request: CreateAddressRequest
  ): Promise<AddressResponse> {
    const createAddressRequest = Validation.validate(
      AddressValidation.CREATE,
      request
    );

    const existingAddressCount = await prisma.address.count({
      where: {
        userId: user.id,
      },
    });

    if (existingAddressCount !== 0) {
      throw new ResponseError(400, "User already has an address");
    }

    const address = await prisma.address.create({
      data: {
        ...createAddressRequest,
        userId: user.id,
      },
    });

    return toAddressResponse(address);
  }

  static async get() {}

  static async update(
    user: User,
    request: UpdateAddressRequest
  ): Promise<AddressResponse> {
    const updateAddressRequest = Validation.validate(
      AddressValidation.UPDATE,
      request
    );

    console.log(updateAddressRequest.id);
    console.log(updateAddressRequest.userId);

    const address = await prisma.address.update({
      where: {
        id: updateAddressRequest.id,
        userId: updateAddressRequest.userId
      },
      data: updateAddressRequest
    });

    return toAddressResponse(address);
  }

  static async remove(user: User, request: DeleteAddressRequest): Promise<AddressResponse> {
        const removeRequest = Validation.validate(AddressValidation.DELETE, request);

        const addressExists = await prisma.address.findUnique({
          where: {
            id: removeRequest.id
          }
        })

        if(!addressExists) throw new ResponseError(404, "Address not found")

        const address = await prisma.address.delete({
            where: {
                id: removeRequest.id,
            }
        });

        return toAddressResponse(address);
    }

    
}
