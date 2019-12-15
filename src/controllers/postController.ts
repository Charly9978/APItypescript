/* import Controller from './controller'
import postModel from '../models/postModel'

const postController = new Controller('/post', postModel)

export default postController */

import * as mongoose from 'mongoose'
import {Router,Request,Response} from 'express'
import auth from '../middleware/auth'
import RequestInterface from '../interfaces/request.interface'
import {PostModel, IPost} from '../models/postModel'
import {filterData} from '../utils/fliterData'




class PostController {
    

    public router:Router = Router()
    public path: string
    private model: mongoose.Model<IPost>

    constructor(){
        this.path = '/messages',
        this.model =  PostModel
        this.initializedRoutes()
    }
    
    private initializedRoutes() {
        
        this.router.get(this.path,this.getAllPosts)
        this.router.get(`${this.path}/:id`,this.getPostById)
        this.router.delete(`${this.path}/:id`,auth.userVerification,this.deletePostById)
        this.router.post(this.path,auth.userVerification,this.postNewPost)
        this.router.put(`${this.path}/:id`,auth.userVerification,this.updatePostById)
    }

    
    private getAllPosts = async (req:RequestInterface,res:Response)=>{
        try {
            const posts = await this.model.find({}).orFail(new Error('pas de posts'))
            //const filteredPosts = filterData(posts)
            res.send(posts)
        } catch (error) {
            res.status(401).send(`${error}`)
        }
    }

    private getPostById = async (req:RequestInterface,res:Response)=>{
        try{
            const post =await this.model.findById(req.params.id).orFail(new Error())
            res.send(post)
        }catch(err){
            res.status(400).send(err)
        }
    }

    private deletePostById = async (req:RequestInterface,res:Response)=>{
        try {
            const post = await this.model.findByIdAndDelete(req.params.id)
            res.send(`sucess deleted: ${post}`)
            
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private postNewPost = async (req:RequestInterface,res:Response)=>{
        try {
            console.log(req)
            const newPost = req.body
            const createdPost = new this.model(newPost)
            await createdPost.save()
            res.status(200).send(createdPost)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    private updatePostById = async (req:RequestInterface,res: Response)=>{
        try {
            const newPost = req.body
            const userId = <string> req.userId
            const oldPostId = req.params.id
            const postToUpdate = await this.model.findById(oldPostId)
            if(!postToUpdate) throw new Error(`l'élément à mettre à jour n'existe pas`)
            if(postToUpdate.userId!=userId) throw new Error(`Vous n'êtes pas autorisé à modifier cet élément`)
            const updateElement = await postToUpdate.update(newPost)
            res.status(200).send(updateElement)
        } catch (error) {
            res.status(400).send(error)
        }
    }




}

const postController = new PostController()

export default postController