import * as mongoose from 'mongoose'
import auth from '../middleware/auth'
import {Router,Request,Response} from 'express'
import {Factory, IFactoryDocument} from '../models/factoryModel'



class FactoryController {
    

    public router:Router = Router()
    public path: string
    private model: mongoose.Model<IFactoryDocument>

    constructor(){
        this.path = '/factory',
        this.model =  Factory
        this.initializedRoutes()
    }
    
    private initializedRoutes() {
        
        this.router.get(`${this.path}/byIncident/:id`,auth.userVerification,this.getAllFactories)
        this.router.get(`${this.path}/:id`,auth.userVerification,this.getFactoryById)
        this.router.delete(`${this.path}/:id`,auth.userVerification,this.deleteFactoryById)
        this.router.post(this.path,auth.userVerification,this.postNewFactory)
        this.router.put(`${this.path}/:id`,auth.userVerification,this.updateFactoryById)
    }

    
    private getAllFactories = async (req:Request,res:Response)=>{
        try {
            const factories = await this.model.find({}).orFail(new Error("pas de factorys"))
            console.log(factories)
            res.send(factories)
        } catch (error) {
            res.status(401).send(`${error}`)
        }
    }

    private getFactoryById = async (req:Request,res:Response)=>{
        try{
            const factory =await this.model.findById(req.params.id).orFail(new Error())
            res.send(factory)
        }catch(err){
            res.status(400).send(err)
        }
    }

    private deleteFactoryById = async (req:Request,res:Response)=>{
        try {
            const factory = await this.model.findByIdAndDelete(req.params.id)
            res.send(`sucess deleted: ${factory}`)
            
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private postNewFactory = async (req:Request,res:Response)=>{
        try {
            console.log(req)
            const newFactory = req.body
            const createdFactory = new this.model(newFactory)
            await createdFactory.save()
            res.status(200).send(createdFactory)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private updateFactoryById = async (req:Request,res: Response)=>{
        try {
            const newFactory = req.body
            const oldFactoryId = req.params.id
            const updatedFactory = await this.model.findByIdAndUpdate(oldFactoryId,newFactory,{new:true})
            res.status(200).send(updatedFactory)
        } catch (error) {
            res.status(400).send(error)
        }
    }




}

const factoryController = new FactoryController()

export default factoryController