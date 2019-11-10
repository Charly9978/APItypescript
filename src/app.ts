import express from 'express'
import Controller from './interfaces/controller.interface'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import 'dotenv/config'

class App {

    public port: number
    public app: express.Application

    constructor(controllers: Controller[], port: number) {
        this.app = express()
        this.port = port
        this.connectToDataBase()
        this.initializeMiddlewares()
        this.initializeControllers(controllers)
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    private initializeMiddlewares(){
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(cookieParser())    
    }

    public listen(){
        this.app.listen(this.port,()=>{
            console.log("app en cours d'écoute")
        })
    }

    private async connectToDataBase(){
        try {
            const{MONGO_USER,MONGO_PASSWORD,MONGO_URL}=process.env
            console.log(MONGO_USER,MONGO_PASSWORD,MONGO_URL)
            await  mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_URL}`,{ useNewUrlParser: true })
            console.log('connecté à la bese de données')
            
        } catch (error) {
            console.error(error)
        }
    }
}

export default App