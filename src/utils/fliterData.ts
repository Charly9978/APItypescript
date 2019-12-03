import { Document } from "mongoose";


/* const newArray = <Array<keyof typeof cat>> Object.keys(cat)
 const  newObject =  newArray.reduce((newObject: object, key: keyof typeof cat) => {
    const top  = cat[key].top
    if (!top) { 
        Object.defineProperty(newObject, key, {
            value: cat[key].value
        })
    }
       return newObject
   
},{}) */

export function filterData<T extends Document>(data:T |T[] ){
    let arrayDatas=[]

    if  (!Array.isArray(data)){
        arrayDatas.push(data)
    }else{
        arrayDatas = data
    }
    const arrayObject = arrayDatas
    .map(data=>data.toObject())
    .map(data=>{
        const newObject = {}
        const props = Object.keys(data)
        console.log(props)
        props.forEach(prop=>{
            if( data[prop].private == false){
                console.log(newObject,prop,data[prop].value)
                Object.defineProperty(newObject,prop,{
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: data[prop].value
                }) 
            }
        })
        return newObject
    })
    return arrayObject
}