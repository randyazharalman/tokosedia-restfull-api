import { Product } from "@prisma/client";
import { normalizeString, normalizeStringArray } from "../helper/normalize";

export type ProductResponse = {
  id: number;
  title: string;
  price: number;
  description: string;
  stock: number;
  brand: string;
  tags?: string[];
  color?: string[];
  size?: string[];
  weight?: number;
  thumbnail: string;
  images: string[];
  sku: string;
  discountPercentage?: number;
  availabilityStatus: string;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  minimumOrderQuantity: number;
  categoryId: number | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateProductRequest = {
  title: string;
  price: number;
  description: string;
  stock: number;
  brand: string;
  tags?: string[];
  color?: string[];
  size?: string[];
  weight?: number;
  thumbnail: string;
  images: string[];
  sku: string;
  discountPercentage?: number;
  availabilityStatus: string;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  minimumOrderQuantity: number;
  categoryId?: number;
};

export type UpdateProductRequest = Partial<CreateProductRequest> & {id: number};

export function toProductResponse(product: Product): ProductResponse {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    stock: product.stock,
    brand: product.brand,
    tags: product.tags,
    color: product.color,
    size: product.size,
    weight: product.weight,
    thumbnail: product.thumbnail,
    images: product.images,
    sku: product.sku,
    discountPercentage: product.discountPercentage,
    availabilityStatus: product.availabilityStatus,
    shippingInformation: product.shippingInformation,
    returnPolicy: product.returnPolicy,
    warrantyInformation: product.warrantyInformation,
    minimumOrderQuantity: product.minimumOrderQuantity,
    categoryId: product.categoryId,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

export function normalizeProductRequest(input: CreateProductRequest) {
  return {
    title: normalizeString(input.title),
    price: input.price,
    description: input.description.trim(),
    stock: input.stock,
    brand: normalizeString(input.brand),
    tags: normalizeStringArray(input.tags),
    color: normalizeStringArray(input.color),
    size: normalizeStringArray(input.size),
    weight: input.weight ?? 0,
    thumbnail: input.thumbnail,
    images: normalizeStringArray(input.images),
    sku: input.sku,
    discountPercentage: input.discountPercentage ?? 0,
    availabilityStatus: input.availabilityStatus,
    shippingInformation: input.shippingInformation,
    returnPolicy: input.returnPolicy,
    warrantyInformation: input.warrantyInformation,
    minimumOrderQuantity: input.minimumOrderQuantity,
    categoryId: input.categoryId,
  };
}
