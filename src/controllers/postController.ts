import Controller from './controller'
import postModel from '../models/postModel'

const postController = new Controller('/post', postModel)

export default postController