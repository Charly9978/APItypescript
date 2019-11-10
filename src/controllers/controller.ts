import * as mongoose from 'mongoose'
import {Router,Request,Response} from 'express'
import auth from '../middleware/auth'
import RequestInterface from '../interfaces/request.interface'
import {IgenericData} from '../interfaces/document.interface'



class Controller {
    

    public router:Router = Router()
    public path: string
    private model: mongoose.Model<IgenericData, {}>

    constructor(path:string,model:mongoose.Model<IgenericData,{}>){
        this.path = path,
        this.model = model
        this.initializedRoutes()
    }
    
    private initializedRoutes() {
        
        this.router.get(this.path,auth.userVerification,this.getAllElements)
        this.router.get(`${this.path}/:id`,auth.userVerification,this.getElementById)
        this.router.delete(`${this.path}/:id`,auth.userVerification,this.deleteElementById)
        this.router.post(this.path,auth.userVerification,this.postNewElement)
        this.router.put(`${this.path}/:id`,auth.userVerification,this.updateElementById)
    }

    
    private getAllElements = async (req:RequestInterface,res:Response)=>{
        try {
            const elements = await this.model.find()
            res.send(elements)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private getElementById = async (req:RequestInterface,res:Response)=>{
        try{
            const element =await this.model.findById(req.params.id)
            res.send(element)
        }catch(err){
            res.status(400).send(err)
        }
    }

    private deleteElementById = async (req:RequestInterface,res:Response)=>{
        try {
            const element = await this.model.findByIdAndDelete(req.params.id)
            res.send(`sucess deleted: ${element}`)
            
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private postNewElement = async (req:RequestInterface,res:Response)=>{
        try {
            console.log(req)
            const newElement = req.body
            const createdElement = new this.model(newElement)
            await createdElement.save()
            res.status(200).send(createdElement)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private updateElementById = async (req:RequestInterface,res: Response)=>{
        try {
            const newElement = req.body
            const userId = <string> req.userId
            const oldElementId = req.params.id
            const elementToUpdate = await this.model.findById(oldElementId)
            if(!elementToUpdate) throw new Error(`l'élément à mettre à jour n'existe pas`)
            if(elementToUpdate.userId!=userId) throw new Error(`Vous n'êtes pas autorisé à modifier cet élément`)
            const updateElement = await elementToUpdate.update(newElement)
            res.status(200).send(updateElement)
        } catch (error) {
            res.status(400).send(error)
        }
    }




}

export default Controller