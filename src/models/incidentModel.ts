import {Document, model, Model, Schema} from 'mongoose'

export interface IAction{
    description:string,
    deadlineDate: Date,
    deadLineTime: number,
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
    deadLineTime: {
        type:String,
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
    desciption: string,
    isPoi: boolean,
    poiDate?: Date,
    crisisRoom:string,
    exerciceMode: boolean,
    personnToAlert: string[],
    isEnd:boolean,
    EndDate:Date,
    actions: IAction[]
}

export interface IIncidentDocument extends IIncident,Document {}


export const incidentSchema:Schema = new Schema({
    date:{
        type:Date,
        },
    desciption: {
        type: String
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
    personnToAlert: {
        type: [String],
        default:[]                 
        },
    isEnd:{
        type: Boolean,
        default:false
        },
    EndDate:{
        type: Date
        },
    actions: [actionSchema]
})

export const IncidentModel = model<IIncidentDocument>('incident',incidentSchema)