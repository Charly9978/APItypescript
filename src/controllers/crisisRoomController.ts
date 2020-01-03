import * as mongoose from 'mongoose'
import {Router,Request,Response} from 'express'
import auth from '../middleware/auth'
import RequestInterface from '../interfaces/request.interface'
import {CrisisRooms, IcrisisRoomDocument} from '../models/crisisRoomModel'



class CrisisRoomsController {
    

    public router:Router = Router()
    public path: string
    private model: mongoose.Model<IcrisisRoomDocument>

    constructor(){
        this.path = '/crisisRooms',
        this.model =  CrisisRooms
        this.initializedRoutes()
    }
    
    private initializedRoutes() {
        
        this.router.get(this.path,this.getAllCrisisRooms)
        this.router.get(`${this.path}/:id`,auth.userVerification,this.getCrisisRoomById)
        this.router.delete(`${this.path}/:id`,auth.userVerification,this.deletetCrisisRoomById)
        this.router.post(this.path,this.postNewCrisisRoom)
        this.router.put(`${this.path}/:id`,auth.userVerification,this.updateCrisisRoomById)
    }

    
    private getAllCrisisRooms = async (req:RequestInterface,res:Response)=>{
        try {
            const crisisRooms = await this.model.find({})
            res.send(crisisRooms)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private getCrisisRoomById = async (req:RequestInterface,res:Response)=>{
        try{
            const crisisRoom = await this.model.findById(req.params.id)
            res.send(crisisRoom)
        }catch(err){
            res.status(400).send(err)
        }
    }

    private deletetCrisisRoomById = async (req:RequestInterface,res:Response)=>{
        try {
            const crisisRoom = await this.model.findByIdAndDelete(req.params.id)
            res.send(`sucess deleted: ${crisisRoom}`)
            
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private postNewCrisisRoom = async (req:RequestInterface,res:Response)=>{
        try {
            console.log(req)
            const newCrisisRoom = req.body
            const createdCrisisRoom = new this.model(newCrisisRoom)
            await createdCrisisRoom.save()
            console.log(createdCrisisRoom)
            res.status(200).send(createdCrisisRoom)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private updateCrisisRoomById = async (req:RequestInterface,res: Response)=>{
        try {
            const newCrisisRoom = req.body
            const oldCrisisRoomId = req.params.id
            const updateCrisisRoom = await this.model.findByIdAndUpdate(oldCrisisRoomId,newCrisisRoom,{new:true})
            console.log('updateRoom:',updateCrisisRoom)
            res.status(200).send(updateCrisisRoom)
        } catch (error) {
            res.status(400).send(error)
        }
    }




}

const crisisRoomsController = new CrisisRoomsController()

export default crisisRoomsController