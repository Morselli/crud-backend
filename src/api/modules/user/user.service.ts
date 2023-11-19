import { IRequest, IResponse, IUserDto } from "./user.dto";
import { User } from "../../../database/entities/User";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export class UserService {

  async createUser({ name, email, password}: IUserDto): Promise<User> {
    
    const userRepository = UserRepository

    if (!email) {
      throw new Error('Email is required')
    }

    const userExist = await userRepository.findOneBy({
      email
    })

    if (userExist) {
      throw new Error('User already exist')
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await userRepository.save(user)

    return user

  }

  async login({ email, password }: IRequest) {

    const userRepository = UserRepository

    const user = await userRepository.findOne({
        where: {
          email
        }
    })

    if (!user) {
      throw new Error('User not found')
    }

    const matchedPassword = await bcrypt.compare(password, user.password)

    if(!matchedPassword) {
      throw new Error('User or password are incorrect')
    }

    const token = sign({}, 'HS256', {
      subject: user.id,
      expiresIn: '1d'
    })

    const returnToken: IResponse = {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }

    return returnToken
  }

  async findAll(): Promise<User[]> {

    const userRepository = UserRepository

    const users = await userRepository.find({
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'deletedAt']
    })

    return users
  }

  async getById(id: string): Promise<User> {
    const userRepository = UserRepository

    const user = await userRepository.findOneBy({
      id
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  async updateById(id: string, {name, email}): Promise<User> {

    const userRepository = UserRepository

    let user = await userRepository.findOneBy({
      id
    })

    if (!user) {
      throw new Error('User not found')
    }

    await userRepository.update(id, {
      name,
      email
    })

    user = await userRepository.findOneBy({
      id
    })

    return user
  }

  async removeById(id: string): Promise<void> {
    const userRepository = UserRepository

    const user = await UserRepository.findOneBy({
      id
    })

    if(!user) {
      throw new Error('Usuário não encontrado')
    }

    await userRepository.delete(id)
  }
}