import { Router } from 'express'
import { UserController } from '../api/modules/user/user.controller'

const router = Router()

const userController = new UserController()

router.post('/user/create', userController.createUser)
router.get('/users', userController.findAll)
router.get('/user/:id', userController.getById)
router.put('/user/:id', userController.updateById)
router.delete('/user/:id', userController.removeById)
router.post('/login', userController.login)

export { router }