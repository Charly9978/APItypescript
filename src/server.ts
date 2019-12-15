import App from './app'
import postController from './controllers/postController'
import userController from './controllers/userController'
import connectionController from './controllers/connectionController'
import fixDatasController from './controllers/fixDatasController'
import transmissionController from './controllers/transmissionController'
import crisisRoomsController from './controllers/crisisRoomController'

const server = new App([postController,userController,connectionController,fixDatasController,transmissionController,crisisRoomsController],3000)

server.listen()