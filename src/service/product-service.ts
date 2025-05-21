import { User } from "@prisma/client";
import { prisma } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateProductRequest,
  normalizeProductRequest,
  ProductResponse,
  toProductResponse,
  UpdateProductRequest,
} from "../model/product-model";
import { toUserResponse } from "../model/user-model";
import { ProductValidation } from "../validation/product-validation";
import { Validation } from "../validation/validation";

export class ProductService {
  static async create(request: CreateProductRequest): Promise<ProductResponse> {
    const createProductRequest = Validation.validate(
      ProductValidation.CREATE,
      request
    );
    // const data = normalizeProductRequest(createProductRequest)

    const productRecord = {
      ...createProductRequest,
      weight: createProductRequest.weight ?? 0,
    };

    const existingProduct = await prisma.product.findFirst({
      where: {
        OR: [
          { sku: productRecord.sku },
          {
            AND: [
              { title: productRecord.title },
              { brand: productRecord.brand },
            ],
          },
        ],
      },
    });

    if (existingProduct) {
      throw new ResponseError(400, "Product Already Exists");
    }

    const category = await prisma.category.findUnique({
      where: { id: productRecord.categoryId },
    });

    if (!category) {
      throw new ResponseError(404, "Category not found");
    }

    const product = await prisma.product.create({
      data: productRecord,
    });

    return toProductResponse(product);
  }

  static async get(id: number): Promise<ProductResponse> {
    if (isNaN(id)) {
      throw new ResponseError(400, "Invalid product ID");
    }
    const product = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      throw new ResponseError(404, "Product not found");
    }

    return toProductResponse(product);
  }

  static async update(user: User, request: UpdateProductRequest): Promise<ProductResponse> {
    const updateProductRequest = Validation.validate(ProductValidation.UPDATE, request);

    const product = await prisma.product.update({
      where: {
        id: updateProductRequest.id
      },
      data: updateProductRequest
    })

    return toProductResponse(product)


  }

  static async remove(id: number): Promise<ProductResponse> {
    if (isNaN(id)) {
      throw new ResponseError(400, "Invalid product ID");
    }

    const product = await prisma.product.delete({
      where: {
        id: Number(id)
      }
    })

    if(!product) {
      throw new ResponseError(404, "Product not found")
    }

    return toProductResponse(product)
  }
}
