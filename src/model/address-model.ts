import { Address } from "@prisma/client";

export type AddressResponse = {
  id: number;
  label: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  userId: number;
};

export type GetAddressRequest = {
    userId: number;
    id: number;
}

export type CreateAddressRequest = {
  label: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  userId: number;
};

export type UpdateAddressRequest = Partial<CreateAddressRequest> & {id: number};

export type DeleteAddressRequest = GetAddressRequest;
export function toAddressResponse(address: Address): AddressResponse {
  return {
    id: address.id,
    label: address.label,
    address: address.address,
    city: address.city,
    postalCode: address.postalCode,
    country: address.country,
    userId: address.userId,
  };
}
