import * as mongoose from 'mongoose'
import {Router,Request,Response} from 'express'
import auth from '../middleware/auth'
import RequestInterface from '../interfaces/request.interface'
import {PlannedTodos, IPlannedTodoDocument} from '../models/plannedTodoModel'



class PlannedTodosController {
    

    public router:Router = Router()
    public path: string
    private model: mongoose.Model<IPlannedTodoDocument>

    constructor(){
        this.path = '/plannedTodos',
        this.model =  PlannedTodos
        this.initializedRoutes()
    }
    
    private initializedRoutes() {
        
        this.router.get(this.path,auth.userVerification,this.getAllTodos)
        this.router.get(`${this.path}/:id`,auth.userVerification,this.getTodoById)
        this.router.delete(`${this.path}/:id`,auth.userVerification,this.deletetTodoById)
        this.router.post(this.path,auth.userVerification,this.postNewTodo)
        this.router.put(`${this.path}/:id`,auth.userVerification,this.updateTodoById)
    }

    
    private getAllTodos = async (req:RequestInterface,res:Response)=>{
        try {
            const todos = await this.model.find({}).orFail(new Error('pas de todos'))
            res.send(todos)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private getTodoById = async (req:RequestInterface,res:Response)=>{
        try{
            const todo = await this.model.findById(req.params.id).orFail(new Error('pas de todo pour cet id'))
            res.send(todo)
        }catch(err){
            res.status(400).send(err)
        }
    }

    private deletetTodoById = async (req:RequestInterface,res:Response)=>{
        try {
            const todo = await this.model.findByIdAndDelete(req.params.id).orFail(new Error('pas de todo pour cet id'))
            res.send(`sucess deleted: ${todo}`)
            
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private postNewTodo = async (req:RequestInterface,res:Response)=>{
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

    private updateTodoById = async (req:RequestInterface,res: Response)=>{
        try {
            const newTodo = req.body
            const oldTodoId = req.params.id
            const todoToUpdate = await this.model.findById(oldTodoId)
            if(!todoToUpdate) throw new Error(`l'élément à mettre à jour n'existe pas`)
            const updatedTodo = await todoToUpdate.update(newTodo)
            res.status(200).send(updatedTodo)
        } catch (error) {
            res.status(400).send(error)
        }
    }




}

const plannedTodosController = new PlannedTodosController()

export default plannedTodosController