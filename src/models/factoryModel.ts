import {Schema,Document, model} from 'mongoose'

interface IFactory {
    name: string,
    adress: string,
    country: string,
    crisisRoomsId:[string]
}

export interface  IFactoryDocument extends IFactory, Document {}

const factorySchema = new Schema({
    name:{
        type: String,
        required: true
    },

    adress:{
        type: String,
        required: true
    },

    country:{
        type: String,
        required: false
    },

    crisisRoomsId:{
        type:[String],
        required: false
    }

})

export const Factory = model<IFactoryDocument>('factories',factorySchema)
