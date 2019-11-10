import {Document, model, Model, Schema} from 'mongoose'


interface IPost extends Document {
    date:{
        value: Date,
        private: boolean}
    message: {
        value:string,
        private:boolean},
    userId: {
            type: string,
        }
}



const postSchema: Schema = new Schema({
    date: {
        value:{
            type: Date,
            default: Date.now
        },
        private:{
            type: Boolean,
            default: false
        }
    },
    message: {
        value:{
            type: String,
        },
        private:{
            type: Boolean,
            default: false
        }
    },
    userId: {
        type: String,
    }
})

const postModel = model<IPost>('Post',postSchema)

export default postModel

const test = new postModel()

Object.keys(test).forEach (value =>{
    const test3 = test[value as keyof typeof test]
    if(test3.private){
        
    }
})



