import { User, UserRole } from "@prisma/client";

export type UserResponse = {
  username: string;
  name: string;
  token?: string;
}


export type CreateUserRequest = {
  username: string;
  name: string;
  password: string;
  email: string;
  updatedAt: string;
  createdAt: string;
  role: UserRole 
}

export type LoginUserRequest = {
  username: string;
  password: string
}

export type UpdateUserRequest = {
  name?: string;
  password?: string;
  email?: string;
}

export function toUserResponse(user: User): UserResponse {
  return {
    username: user.username,
    name: user.name,
  }

}