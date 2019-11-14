import App from './app'
import PostController from './controllers/postController'
import userController from './controllers/userController'
import connectionController from './controllers/connectionController'

const server = new App([new PostController(),userController,connectionController],5000)

server.listen()