import Controller from './controller'
import userModel from '../models/userModel'

const userController = new Controller('/user',userModel)

export default userController