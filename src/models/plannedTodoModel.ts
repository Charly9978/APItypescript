import {Document, Schema, model} from 'mongoose'

interface IPlannedTodo {
    description:string,
    deadLineTime: number,
    isClose:boolean,
    closeDate?:Date,
    category: string
}

export interface IPlannedTodoDocument extends IPlannedTodo, Document {}

const plannedTodoSchema:Schema = new Schema({
    description:{
        type: String,
        required:true  
    },
    deadLineTime: {
        type:String,
        required:true
    },
    isClose:{
        type: Boolean,
        default: false
    },
    closeDate:{
        type: Date,
        required:false
    },
    category: {
        type: String,
        enum:['poiTodo','mairieTodo','neighbourTodo','closeTodo'],
        required:true
    }

})

export const PlannedTodos = model<IPlannedTodoDocument>('plannedTodos',plannedTodoSchema)

