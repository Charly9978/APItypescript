

import * as mongoose from 'mongoose'
import {Router,Request,Response} from 'express'
import auth from '../middleware/auth'
import RequestInterface from '../interfaces/request.interface'
import {UserModel, IUser} from '../models/userModel'



class UserController {
    

    public router:Router = Router()
    public path: string
    private model: mongoose.Model<IUser>

    constructor(){
        this.path = '/post',
        this.model =  UserModel
        this.initializedRoutes()
    }
    
    private initializedRoutes() {
        
        this.router.get(this.path,auth.userVerification,this.getAllUsers)
        this.router.get(`${this.path}/:id`,auth.userVerification,this.getUserById)
        this.router.delete(`${this.path}/:id`,auth.userVerification,this.deleteUsertById)
        this.router.post(this.path,auth.userVerification,this.postNewUser)
        this.router.put(`${this.path}/:id`,auth.userVerification,this.updateUserById)
    }

    
    private getAllUsers = async (req:RequestInterface,res:Response)=>{
        try {
            const users = await this.model.find({})
            res.send(users)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private getUserById = async (req:RequestInterface,res:Response)=>{
        try{
            const user = await this.model.findById(req.params.id)
            if(user)user.ex
            res.send(user)
        }catch(err){
            res.status(400).send(err)
        }
    }

    private deleteUsertById = async (req:RequestInterface,res:Response)=>{
        try {
            const user = await this.model.findByIdAndDelete(req.params.id)
            res.send(`sucess deleted: ${user}`)
            
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private postNewUser = async (req:RequestInterface,res:Response)=>{
        try {
            console.log(req)
            const newUser = req.body
            const createdUser = new this.model(newUser)
            await createdUser.save()
            res.status(200).send(createdUser)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private updateUserById = async (req:RequestInterface,res: Response)=>{
        try {
            const newUser = req.body
            const userId = <string> req.userId
            const oldUserId = req.params.id
            const userToUpdate = await this.model.findById(oldUserId)
            if(!userToUpdate) throw new Error(`l'élément à mettre à jour n'existe pas`)
            if(userToUpdate.userId!=userId) throw new Error(`Vous n'êtes pas autorisé à modifier cet élément`)
            const updateUser = await userToUpdate.update(newUser)
            res.status(200).send(updateUser)
        } catch (error) {
            res.status(400).send(error)
        }
    }




}

const userController = new UserController()

export default userController