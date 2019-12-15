import App from './app'
import postController from './controllers/postController'
import userController from './controllers/userController'
import connectionController from './controllers/connectionController'
import fixDatasController from './controllers/fixDatasController'
import transmissionController from './controllers/transmissionController'
import crisisRoomsController from './controllers/crisisRoomController'
import plannedTodosController from './controllers/plannedTodosController'

const controllers = [
    postController,
    userController,
    connectionController,
    transmissionController,
    crisisRoomsController,
    plannedTodosController
]

const server = new App(controllers,3000)

server.listen()