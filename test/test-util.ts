import { Address, Product, Review, User } from "@prisma/client";
import { prisma } from "../src/application/database";
import bcrypt from "bcrypt";

export class UserTest {
  static async get(): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        username: "test",
      },
    });

    if (!user) {
      throw new Error("User is not found");
    }

    return user;
  }

  static async create() {
    await prisma.user.create({
      data: {
        username: "test",
        name: "test",
        password: await bcrypt.hash("test", 10),
        token: "test",
        email: "test@gmail.com",
      },
    });
  }

  static async delete() {
    await prisma.user.deleteMany({
      where: {
        username: "test",
        email: "test@gmail.com",
      },
    });
  }
}

export class ProductTest {
  static async create() {
    const category = await prisma.category.findFirst({
      where: {
        name: "test-category",
      },
    });
    await prisma.product.create({
      data: {
        title: "title",
        price: 190,
        description: "desc",
        stock: 100,
        brand: "brand",
        tags: ["shoes", "bags"],
        color: ["black"],
        size: ["30", "40"],
        weight: 100,
        thumbnail: "https//thumbnail.com",
        images: ["https://images1.com", "https://images2.com"],
        sku: "sku-1",
        discountPercentage: 40,
        availabilityStatus: "available",
        shippingInformation: "3 hours delivered",
        returnPolicy: "return policy",
        warrantyInformation: "warranty",
        minimumOrderQuantity: 10,
        categoryId: category?.id,
      },
    });
  }

  static async deleteAll() {
    await prisma.product.deleteMany({
      where:{
        title: "title"
      }
    });
  }

  static async get(): Promise<Product> {
    const product = await prisma.product.findFirst({
      where: {
        title: "title",
      },
    });

    if (!product) {
      throw new Error("Product is not found");
    }

    return product;
  }
}

export class AddressTest {
  static async create() {
    const user = UserTest.get();
    await prisma.address.create({
      data: {
        label: "cicalung",
        address: "Sukaresik",
        city: "Tasikmalaya",
        country: "Indonesia",
        postalCode: "46159",
        userId: (await user).id,
      },
    });
  }

  static async get(): Promise<Address> {
    const address = await prisma.address.findFirst({
      where: {
        user: {
          username: "test",
        },
      },
    });

    if (!address) {
      throw new Error("Address is not found");
    }

    return address;
  }

  static async delete() {
    const user = UserTest.get();
    await prisma.address.deleteMany({
      where: {
        userId: (await user).id,
      },
    });
  }
}

export class ReviewTest {
  static async create() {
    const user = await UserTest.get();
    const product = await ProductTest.get();
    await prisma.review.create({
      data: {
        reviewerName: user.name,
        reviewerEmail: user.email,
        comment: "test comment",
        rating: 5,
        date: new Date().toISOString(),
        productId: product.id,
        userId: user.id,
      },
    });
  }
  static async get(): Promise<Review> {
    const user = await UserTest.get()
    const review = await prisma.review.findFirst({
      where: {
        reviewerName:user.name,
      },
    });

    if (!review) {
      throw new Error("Review is not found");
    }

    return review;
  }

  static async delete() {
    const review = await prisma.review.findFirst({
      where: {
        user: {
          username: "test",
        },
      },
    });
    await prisma.review.deleteMany({
      where: {
        id: review?.id,
      },
    });

    return review
  }
}


export class CategoryTest {
  static async get(){
    const category = await prisma.category.findFirst({
      where: {
        name: "test-category"
      }
    })
    return category
  }
}


export class CartTest {
  // static async create() {
  //   const cart = await prisma.cart.create({
  //     data: {
  //       userId: 268
  //     }
  //   })

  //   return cart
  // }

  static async get(){
    const cart = await prisma.cart.findFirst({
      where: {
        userId: 268
      }
    })
     if (!cart) {
      throw new Error("Cart is not found");
    }
    return cart
  }

  static async delete(){
    const cart = await prisma.cart.deleteMany()

    return cart
  }
}


export class WishlistTest {
    static async create(userId: number, productIds: number[]) {
    return prisma.wishlist.create({
      data: {
        userId,
        items: {
          connect: productIds.map(id => ({ id })),
        },
      },
    });
  }

  static async delete() {
    return prisma.wishlist.deleteMany();
  }
}

export class ActivityLogTest{
  static async create(){
    const user = await UserTest.get()
    return await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "test"
      }
    })
  }

  static async get(){
    return await prisma.activityLog.findFirst({
      where: {
        action: "test"
      }
    })
  }

  static async delete(){
    return await prisma.activityLog.deleteMany()
  }
}