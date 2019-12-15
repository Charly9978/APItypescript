import {Model,Schema,Document,model} from 'mongoose'


interface IUser{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    connected: boolean,
    fullName: string,
    initials: string,
    userId: string
}


export interface IUserDocument extends IUser, Document {}

/* interface IIndexUser {
    firstName:Iuser['firstName'],
    lastName:Iuser['lastName'],
    email:Iuser['email'],
    password:Iuser['password'],
    connected:Iuser['connected'],
    fullName:Iuser['fullName'],
    initials:Iuser['initials'],
    userId:Iuser['userId']
} */

const userSchema:Schema = new Schema({
    firstName:{
            type:String,
            required: true,
            min:4
    },
    lastName:{
            type:String,
            required: true,
            min:3
    },
    email:{
            type:String,
            required: true,
            min:6
    },
    password:{
            type:String,
            required: true,
            min:6
    },
    connected:{
            type:Boolean,
            required: false,
    },
    userId:{
        type: String,
    }
})


userSchema.virtual('fullName').get(function(this: IUserDocument){
    return {
        value: `${this.firstName} ${this.lastName}`,
        secret: false
    }
})

userSchema.virtual('initials').get(function(this: IUserDocument){
    return {
        value: this.firstName.charAt(0).toUpperCase()+this.lastName.charAt(0).toUpperCase(),
        private: false
    }
})

export const UserModel = model<IUserDocument>('userModel',userSchema)



  