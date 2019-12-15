import {Schema,Document, model} from 'mongoose'

interface IcrisisRoom {
    name: string,
    position: string,
    phoneNumber: string
}

export interface IcrisisRoomDocument extends IcrisisRoom, Document{}

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

export const CrisisRooms = model<IcrisisRoomDocument>('crisisRooms',crisisRoomSchema)