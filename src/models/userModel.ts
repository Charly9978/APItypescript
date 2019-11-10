import {Model,Schema,Document,model} from 'mongoose'

interface Iuser extends Document{
    firstName:{
        value: string,
        private: boolean,
    },
    lastName:{
        value: string,
        private:boolean
    },
    email:{
        value: string,
        private: boolean
    },
    password:{
        value: string,
        private: boolean
    },
    connected:{
        value: boolean,
        private: boolean
    },
    fullName:{
        value: string,
        private: boolean
    },
    initials:{
        value: string,
        private: boolean
    },
    userId: string
}

interface IIndexUser {
    firstName:Iuser['firstName'],
    lastName:Iuser['lastName'],
    email:Iuser['email'],
    password:Iuser['password'],
    connected:Iuser['connected'],
    fullName:Iuser['fullName'],
    initials:Iuser['initials'],
    userId:Iuser['userId']
}

const userSchema:Schema = new Schema({
    firstName:{
       value:{ 
            type:String,
            required: true,
            min:4
       },
       private:{
           type:Boolean,
           default: false
       }
    },
    lastName:{
        value:{ 
            type:String,
            required: true,
            min:3
       },
       private:{
           type:Boolean,
           default: false
       }
    },
    email:{
        value:{ 
            type:String,
            required: true,
            min:6
       },
       private:{
           type:Boolean,
           default: true
       }
    },
    password:{
        value:{ 
            type:String,
            required: true,
            min:6
       },
       private:{
           type:Boolean,
           default: true
       }
    },
    connected:{
        value:{ 
            type:Boolean,
            required: false,
       },
       private:{
           type:Boolean,
           default: false
       }
    },
    userId:{
        type: String,
    }
})


userSchema.virtual('fullName').get(function(this: Iuser){
    return {
        value: `${this.firstName.value} ${this.lastName.value}`,
        secret: false
    }
})

userSchema.virtual('initials').get(function(this: Iuser){
    return {
        value: this.firstName.value.charAt(0).toUpperCase()+this.lastName.value.charAt(0).toUpperCase(),
        private: false
    }
})

const userModel = model<Iuser>('userModel',userSchema)

export default userModel


  