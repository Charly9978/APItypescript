import * as mongoose from 'mongoose'
import auth from '../middleware/auth'
import {Router,Request,Response} from 'express'
import {TodosModel, ITodoDocument} from '../models/todoModel'



class TodoController {
    

    public router:Router = Router()
    public path: string
    private model: mongoose.Model<ITodoDocument>

    constructor(){
        this.path = '/todo',
        this.model =  TodosModel
        this.initializedRoutes()
    }
    
    private initializedRoutes() {
        
        this.router.get(`${this.path}/byIncident/:id`,auth.userVerification,this.getAllTodosByIncidentId)
        this.router.get(`${this.path}/:id`,auth.userVerification,this.getTodoById)
        this.router.delete(`${this.path}/:id`,auth.userVerification,this.deleteTodoById)
        this.router.post(this.path,auth.userVerification,this.postNewTodo)
        this.router.put(`${this.path}/:id`,auth.userVerification,this.updateTodoById)
    }

    
    private getAllTodosByIncidentId = async (req:Request,res:Response)=>{
        try {
            const incidentId = req.params.id
            const todos = await this.model.find({incidentId}).orFail(new Error("pas de todos"))
            res.send(todos)
        } catch (error) {
            res.status(401).send(`${error}`)
        }
    }

    private getTodoById = async (req:Request,res:Response)=>{
        try{
            const todo =await this.model.findById(req.params.id).orFail(new Error())
            res.send(todo)
        }catch(err){
            res.status(400).send(err)
        }
    }

    private deleteTodoById = async (req:Request,res:Response)=>{
        try {
            const todo = await this.model.findByIdAndDelete(req.params.id)
            res.send(`sucess deleted: ${todo}`)
            
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private postNewTodo = async (req:Request,res:Response)=>{
        try {
            console.log(req)
            const newTodo = req.body
            const createdTodo = new this.model(newTodo)
            await createdTodo.save()
            res.status(200).send(createdTodo)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private updateTodoById = async (req:Request,res: Response)=>{
        try {
            const newTodo = req.body
            const oldTodoId = req.params.id
            const updatedTodo = await this.model.findByIdAndUpdate(oldTodoId,newTodo,{new:true})
            res.status(200).send(updatedTodo)
        } catch (error) {
            res.status(400).send(error)
        }
    }




}

const todoController = new TodoController()

export default todoController