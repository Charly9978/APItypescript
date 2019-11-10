import mongoose from 'mongoose'


export interface IdataStructure{
    [index:string]:{value: any,private: boolean}
    &{userId: string}
  
}

export interface IgenericData extends mongoose.Document {
    userId: string
}

//export type TgenericDataType = IdataStructure & mongoose.Document

export default TgenericDataType



