import {Document, model, Model, Schema} from 'mongoose'
import {actionSchema,IAction} from './incidentModel'


interface ICrisisRoom{
    name: string,
    position: string,
    phoneNumber: string
}

export interface IFixDatas extends Document{
    crisisRooms:[ICrisisRoom],
    poiActions: [IAction],
    mairieActions: [IAction],
    neibourActions:[IAction],
    closeAction: [IAction]
}

const crisisRoomSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    position: {
        type: String,
        required: true
    },
    phoneNumber: {
        type:String,
        required:true
    }

})

const fixDatasSchema = new Schema({
    crisisRooms:{
        type:[crisisRoomSchema],
        required:true
    },
    poiActions: {
        type:[actionSchema],
        required:true
    },
    mairieActions: {
        type:[actionSchema],
        required:true
    },
    neibourghActions:{
        type:[actionSchema],
        required:true
    },
    closeAction: {
        type:[actionSchema],
        required:true
    }

})

export const FixDatasModel = model<IFixDatas>('fixDatas',fixDatasSchema)