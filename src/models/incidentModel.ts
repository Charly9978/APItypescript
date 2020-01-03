import {Document, model, Model, Schema} from 'mongoose'

export interface IAction{
    description:string,
    deadlineDate: Date,
    isClose:boolean,
    closeDate:Date,
}

export interface IActionDocument extends Document,IAction{}

export const actionSchema:Schema = new Schema({
    description:{
        type: String,
        required:true  
    },
    deadlineDate: {
        type:Date,
        required:false
    },
    isClose:{
        type: Boolean,
        default: false
    },
    closeDate:{
        type: Date,
        required:false
    },

})



export interface IIncident{
    date:Date,
    description: string,
    lieu?: string,
    isPoi: boolean,
    poiDate?: Date,
    crisisRoom?:string,
    needContactMairie: boolean,
    needContactNeighbour: boolean,
    exerciceMode: boolean,
    isEnd:boolean,
    endDate:Date,
    actions: IAction[]
}

export interface IIncidentDocument extends IIncident,Document {}


export const incidentSchema:Schema = new Schema({
    date:{
        type:Date,
        },
    description: {
        type: String
        },
    lieu: {
        type: String,
        required:false
    },
    isPoi: {
        type:Boolean,
        default: false
        },
    poiDate: {
        type: Date
        },
    crisisRoom:{
        type: String
        },
    exerciceMode: {
        type: Boolean
        },
    needContactMairie: {
            type: Boolean,
            default: undefined
        },
    needContactNeighbour: {
        type: Boolean,
        defaul: undefined
    },
    isEnd:{
        type: Boolean,
        default:false
        },
    endDate:{
        type: Date,
        },
    actions: {
        type:[actionSchema],
        default:[]
    },
})

export const IncidentModel = model<IIncidentDocument>('incident',incidentSchema)