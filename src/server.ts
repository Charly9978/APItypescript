import App from './app'
import postController from './controllers/postController'
import userController from './controllers/userController'
import connectionController from './controllers/connectionController'

const server = new App([postController,userController,connectionController],5000)

server.listen()