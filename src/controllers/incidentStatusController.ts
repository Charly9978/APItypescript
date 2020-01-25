import * as mongoose from 'mongoose'
import auth from '../middleware/auth'
import {Router,Request,Response} from 'express'
import {IncidentStatus, IIncidentStatusDocument} from '../models/incidentStatusModel'



class IncidentStatusController {
    

    public router:Router = Router()
    public path: string
    private model: mongoose.Model<IIncidentStatusDocument>

    constructor(){
        this.path = '/incidentStatus',
        this.model =  IncidentStatus
        this.initializedRoutes()
    }
    
    private initializedRoutes() {
        
        this.router.get(`${this.path}/byIncident/:id`,auth.userVerification,this.getAllIncidentStatussByIncidentId)
        this.router.get(`${this.path}/:id`,auth.userVerification,this.getIncidentStatusById)
        this.router.delete(`${this.path}/:id`,auth.userVerification,this.deleteIncidentStatusById)
        this.router.post(this.path,auth.userVerification,this.postNewIncidentStatus)
        this.router.post(`${this.path}/many`,auth.userVerification,this.postNewIncidentStatuss)
        this.router.put(`${this.path}/:id`,auth.userVerification,this.updateIncidentStatusById)
    }

    
    private getAllIncidentStatussByIncidentId = async (req:Request,res:Response)=>{
        try {
            const incidentId = req.params.id
            const incidentStatuss = await this.model.find({incidentId}).sort({deadLineDate:'asc'}).orFail(new Error("pas de incidentStatuss"))
            console.log(incidentStatuss)
            res.send(incidentStatuss)
        } catch (error) {
            res.status(401).send(`${error}`)
        }
    }

    private getIncidentStatusById = async (req:Request,res:Response)=>{
        try{
            const incidentStatus =await this.model.findById(req.params.id).orFail(new Error())
            res.send(incidentStatus)
        }catch(err){
            res.status(400).send(err)
        }
    }

    private deleteIncidentStatusById = async (req:Request,res:Response)=>{
        try {
            const incidentStatus = await this.model.findByIdAndDelete(req.params.id)
            res.send(`sucess deleted: ${incidentStatus}`)
            
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private postNewIncidentStatuss = async (req:Request,res:Response)=>{
        try {
            const newIncidentStatuss = req.body
            const createdIncidentStatuss = await this.model.insertMany(newIncidentStatuss)
            res.status(200).send(createdIncidentStatuss)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private postNewIncidentStatus = async (req:Request,res:Response)=>{
        try {
            console.log(req)
            const newIncidentStatus = req.body
            const createdIncidentStatus = new this.model(newIncidentStatus)
            await createdIncidentStatus.save()
            res.status(200).send(createdIncidentStatus)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private updateIncidentStatusById = async (req:Request,res: Response)=>{
        try {
            const newIncidentStatus = req.body
            const oldIncidentStatusId = req.params.id
            const updatedIncidentStatus = await this.model.findByIdAndUpdate(oldIncidentStatusId,newIncidentStatus,{new:true})
            res.status(200).send(updatedIncidentStatus)
        } catch (error) {
            res.status(400).send(error)
        }
    }




}

const incidentStatusController = new IncidentStatusController()

export default incidentStatusController