import { User } from "@prisma/client";
import { prisma } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, LoginUserRequest, toUserResponse, UpdateUserRequest, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"
import {v4 as uuid, validate} from "uuid"

export class UserService {

  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const userRegisterRequest = Validation.validation(UserValidation.REGISTER, request)
    
    const checkUserExist = await prisma.user.count({
      where:{
        username: userRegisterRequest.username
      }
    })

    if(checkUserExist != 0 ){
      throw new ResponseError(400, "Username already exists")
    }

    userRegisterRequest.password = await bcrypt.hash(userRegisterRequest.password, 10);

    const user = await prisma.user.create({
      data: userRegisterRequest
    });

    return toUserResponse(user)

  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const userLoginRequest = Validation.validation(UserValidation.LOGIN,request);

    let user = await prisma.user.findUnique( {
      where: {
        username: userLoginRequest.username
      }
    })

    if(!user){
      throw new ResponseError(401, "Username or password wrong")
    }
    
    const isPasswordValid = await bcrypt.compare(userLoginRequest.password, user.password)
    
    if(!isPasswordValid){
      throw new ResponseError(401, "Username or password wrong")
    }

    user = await prisma.user.update({
      where: {
        username: userLoginRequest.username,
      },
      data:
      {
        token: uuid()
      }
    })

    const response = toUserResponse(user);
    response.token = user.token!;
    return response

  }

  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user)
  }

  static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
    const userUpdateRequest = Validation.validation(UserValidation.UPDATE, request)

    if(userUpdateRequest.name) {
      user.name= userUpdateRequest.name
    }

    if(userUpdateRequest.password) {
      user.password = await bcrypt.hash(userUpdateRequest.password, 10)
    }

    if(userUpdateRequest.email){
      user.email = userUpdateRequest.email
    }

    const result = await prisma.user.update({
      where : {
        username: user.username
      },

      data: user
    })

    return toUserResponse(result)

  }

  static async logout(user: User): Promise<UserResponse> {

    const result = await prisma.user.update({
      where : {
        username: user.username
      },
      data: {
        token: null
      }
    })

    return toUserResponse(result)
  }
  

  }
