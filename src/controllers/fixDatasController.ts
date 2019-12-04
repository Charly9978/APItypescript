import * as mongoose from 'mongoose'
import {Router,Request,Response} from 'express'
import {FixDatasModel, IFixDatasDocument} from '../models/fixDatasModel'



class FixDatasController {
    

    public router:Router = Router()
    public path: string
    private model: mongoose.Model<IFixDatasDocument>

    constructor(){
        this.path = '/incident',
        this.model =  FixDatasModel
        this.initializedRoutes()
    }
    
    private initializedRoutes() {
        
        this.router.get(this.path,this.getFixDatas)
        this.router.post(this.path,this.createFixDatas)
        this.router.put(`${this.path}/:id`,this.updateFixeDatas)
    }

    
    private getFixDatas = async (req:Request,res:Response)=>{
        try {
            const fixDatasArray = await this.model.find({}).orFail(new Error('pas de posts'))
            res.send(fixDatasArray[0])
        } catch (error) {
            res.status(401).send(`${error}`)
        }
    }


    private createFixDatas = async (req:Request,res:Response)=>{
        try {
            console.log(req)
            const fixDatas = req.body
            const createdFixeDatas = new this.model(fixDatas)
            await createdFixeDatas.save()
            res.status(200).send(createdFixeDatas)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private updateFixeDatas = async (req:Request,res: Response)=>{
        try {
            const newFixData = req.body
            const fixDatasToUpdateArray =  await this.model.find({}).orFail(new Error('pas de posts'))
            const fixDatasToUpdate = fixDatasToUpdateArray[0]
            const updateElement = await fixDatasToUpdate.update(newFixData)
            res.status(200).send(updateElement)
        } catch (error) {
            res.status(400).send(error)
        }
    }




}

const fixDatasController = new FixDatasController()

export default fixDatasController