import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cryptoRandomString from 'crypto-random-string'
import {UserModel} from '../models/userModel'
import RequestInterface from '../interfaces/request.interface'






interface cookie {
    key: string,
    value: string,
    option: object,
    userSessionId?: string
}

interface payloadToken {
    _id: string,
    userSessionId: string,
}

interface userConnected {
    fullName: string,
    _id: string,
    initials: string
}



class Auth {
    
    private usersConnected: userConnected[] = []
    
    constructor() {
        this.getUsersConnectedFromDataBase()     
    }
    
    private async getUsersConnectedFromDataBase() {
        const usersConnectedFromDB = await UserModel.find({ connected: true })
        usersConnectedFromDB.forEach((user) => {
            this.usersConnected.push({ fullName: user.fullName, _id: user._id, initials: user.initials })
        })
    }

    get userConnected() {
        return this.usersConnected
    }


    public userVerification = async (req: RequestInterface, res: Response, next: NextFunction) => {
        try {
            const token = req.headers['authorization']
            console.log(`token: ${token}`)
            const cookies = req.cookies
            console.log(`cookie: ${cookies}`)
            const jwtToken = this.modifyIncomingToken(token)
            const userId = await this.checkToken(jwtToken, cookies)
            console.log(`userId:${userId}`)
            req.userId = userId
            await this.addUserToConnectedUser(userId)
            next()
        } catch (error) {
            console.error(error)
            res.status(401).send(error)
        }
    }

    private modifyIncomingToken = (token: string | undefined) => {
        if (!token || !token.includes("Bearer")) throw new Error('Pas de token valide')//res.status(401).send({ auth: false, message: 'No valid token provided.' })
        const jwtToken = token.replace("Bearer", "")
        return jwtToken
    }

    private checkToken = async (token: string, cookie: cookie | any | undefined) => {
        const { _id, userSessionId } = await <payloadToken>jwt.verify(token, <string>process.env.TOKEN_KEY)
        if (!cookie.userSessionId || !bcrypt.compare(cookie.userSessionId, userSessionId)) throw new Error('sessionId invalid')
        return _id
    }

    public addUserToConnectedUser = async (userId: string) => {
        try {
            if (!this.usersConnected.some(user => user._id == userId)) {
                const userFromDB = await UserModel.findById(userId)
                if (userFromDB == null) throw new Error(`id (${userId}) du user n'est pas dans la base de donnée`)
                userFromDB.connected = true
                await userFromDB.save()
                this.usersConnected.push({
                    fullName: userFromDB.fullName,
                    _id: userFromDB._id,
                    initials: userFromDB.initials
                })
            }
        } catch (error) {
            throw error
        }
    }

    public deleteUserToConnectedUser = async (userId: string) => {
        try {
            const userFromDB = await UserModel.findById(userId)
            if (userFromDB == null) throw new Error(`id (${userId}) du user n'est pas dans la base de donnée`)
            userFromDB.connected = false
            await userFromDB.save()
            const index = this.usersConnected.findIndex(userConnected => userConnected._id == userId)
            if (index == -1) throw new Error(`l'id: ${userId} n'a pas été trouvé dans la liste des utilisateurs connecté`)
            this.usersConnected.splice(index, 1)

        } catch (error) {
            throw error
        }
    }



    public createTokenAndCookie = async (_id: string) => {
        const userString = cryptoRandomString({ length: 10 })
        const hashUserString = await bcrypt.hash(userString, 10)
        const cookie: cookie = {
            key: "userSessionId",
            value: userString,
            option: {
                httpOnly: true,/*,
                secure:false,
                sameSite : false,*/
                domain:'fr.localhost.com',
                path:'/',
                expires: new Date(Date.now() + 3600000),

            }
        }

        const payload:payloadToken= {
            userSessionId : hashUserString,
            _id
        }

        const token = jwt.sign(payload, <string>process.env.TOKEN_KEY, {
            expiresIn: '1h'
        })
        return { cookie, token }
    }

    public compareUserIdToReqParamsId = (req: RequestInterface, res: Response, next: NextFunction)=>{
        const idToAccess = req.params.id
        const userId = <string>req.userId
        if(userId == idToAccess){
            next()
        } else {
            throw new Error (`non autorisé à modifier ce document`)}
    }

}

const auth = new Auth()

export default auth