import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {

  async createUser(request: Request, response: Response): Promise<Response> {

    const userService = new UserService()

    const { name, email, password } = request.body

    try {
      
      const user = await userService.createUser({
        name,
        email,
        password
      })

      return response.json(user)

    } catch (error) {

      return response.json({error: error.message})

    }
  }

  async login(request: Request, response: Response): Promise<Response> {

    const userService = new UserService()

    const { email, password } = request.body

    console.log('email CONTROLLER', email)
    console.log('PASSWORD CONTROLLER', password)

    try {

      const token = await userService.login({
        email,
        password
      })

      return response.json(token)
    } catch (error) {

      return response.json({error: error.message})

    }
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    const userService = new UserService()

    try {
      const users = await userService.findAll()
  
      return response.json(users)

    } catch (error) {

      return response.json({error: error.message})

    }
  }

  async getById(request: Request, response: Response): Promise<Response> {
    const userService = new UserService()

    const { id } = request.params

    try {
      const user = await userService.getById(id)

      return response.json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt
      })
    } catch (error) {
      return response.json({error: error.message})
    }
  }

  async updateById(request: Request, response: Response): Promise<Response> {
    const userService = new UserService()

    const { id } = request.params
    const { name, email } = request.body

    try {
      const user = await userService.updateById(id, {name, email})

      return response.json({
        id: user.id,
        name: user.email,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt
      })
    } catch (error) {
      return response.json({error: error.message})
    }
  }

  async removeById(request: Request, response: Response): Promise<object> {
    const userService = new UserService()

    const { id } = request.params
    
    try {
      await userService.removeById(id)

      return response.status(204).json({})
    } catch (error) {
      return response.json({ error: error.message })
    }
  }
}