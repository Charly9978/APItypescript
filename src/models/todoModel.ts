import {Document, Schema, model} from 'mongoose'

interface ITodo {
    description:string,
    incidentId:string,
    deadLineDate: Date,
    isClose:boolean,
    isLate: boolean,
    closeDate?:Date,
}

export interface ITodoDocument extends ITodo, Document {}

const todoSchema:Schema = new Schema({
    description:{
        type: String,
        required:true  
    },
    incidentId:{
        type:String,
        required: true
    },
    deadLineDate: {
        type:Date,
        required:true
    },
    isLate:{
        type: Boolean,
        default: false
    },
    isClose:{
        type: Boolean,
        default: false
    },
    closeDate:{
        type: Date,
        required:false
    }

})

export const TodosModel = model<ITodoDocument>('todos',todoSchema)