import userModel from '../models/userModel'

export const filterPrivateDatas = (datas: TgenericDataType[] | TgenericDataType )=>{
 
} 

const filterPrivateData = async (data: TgenericDataType)=>{
  
}

//const keys = <{ <T>(o: T): Array<keyof T> }>Object.keys

const keys : <T>(o:T)=> Array<keyof T>= Object.keys

const newArray = <Array<keyof typeof cat>> Object.keys(cat)
 const  newObject =  newArray.reduce((newObject: object, key: keyof typeof cat) => {
    const top  = cat[key].top
    if (!top) { 
        Object.defineProperty(newObject, key, {
            value: cat[key].value
        })
    }
       return newObject
   
},{})