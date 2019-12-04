import * as mongoose from 'mongoose'
import {Router,Request,Response} from 'express'
import {IncidentModel, IIncidentDocument} from '../models/incidentModel'



class IncidentController {
    

    public router:Router = Router()
    public path: string
    private model: mongoose.Model<IIncidentDocument>

    constructor(){
        this.path = '/incident',
        this.model =  IncidentModel
        this.initializedRoutes()
    }
    
    private initializedRoutes() {
        
        this.router.get(this.path,this.getAllIncidents)
        this.router.get(`${this.path}/:id`,this.getIncidentById)
        this.router.delete(`${this.path}/:id`,this.deleteIncidentById)
        this.router.post(this.path,this.postNewIncident)
        this.router.put(`${this.path}/:id`,this.updateIncidentById)
    }

    
    private getAllIncidents = async (req:Request,res:Response)=>{
        try {
            const incidents = await this.model.find({}).orFail(new Error('pas de posts'))
            res.send(incidents)
        } catch (error) {
            res.status(401).send(`${error}`)
        }
    }

    private getIncidentById = async (req:Request,res:Response)=>{
        try{
            const incident =await this.model.findById(req.params.id).orFail(new Error())
            res.send(incident)
        }catch(err){
            res.status(400).send(err)
        }
    }

    private deleteIncidentById = async (req:Request,res:Response)=>{
        try {
            const incident = await this.model.findByIdAndDelete(req.params.id)
            res.send(`sucess deleted: ${incident}`)
            
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private postNewIncident = async (req:Request,res:Response)=>{
        try {
            console.log(req)
            const newIncident = req.body
            const createdIncident = new this.model(newIncident)
            await createdIncident.save()
            res.status(200).send(createdIncident)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private updateIncidentById = async (req:Request,res: Response)=>{
        try {
            const newIncident = req.body
            const oldIncidentId = req.params.id
            const incidentToUpdate = await this.model.findById(oldIncidentId)
            if(!incidentToUpdate) throw new Error(`l'élément à mettre à jour n'existe pas`)
            const updateElement = await incidentToUpdate.update(newIncident)
            res.status(200).send(updateElement)
        } catch (error) {
            res.status(400).send(error)
        }
    }




}

const incidentController = new IncidentController()

export default incidentController