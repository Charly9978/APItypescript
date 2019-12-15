import { Router, Request, Response} from 'express'
import {UserModel} from '../models/userModel'
import auth from '../middleware/auth'
import bcrypt from 'bcryptjs'
import registerDataValidation from '../utils/joi'
import interfaceRequest from '../interfaces/request.interface'

interface dataRegisterInterface {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

interface dataLoginInterface {
    email: string,
    password: string,  
}

class Connection {

    public path:string = '/connection'
    public router: Router = Router()

    constructor() {
        this.initializedRoutes()
    }

    private initializedRoutes() {
        this.router.post(`${this.path}/login`, this.login)
        this.router.post(`${this.path}/register`, this.register)
        this.router.delete(`${this.path}/logout`,auth.userVerification, this.logout)
    }


    private register = async (req: Request, res: Response) => {

        try {
            const data: dataRegisterInterface = req.body

            console.log(data)

            //vérifier le nom, prenom, le mot de pass
            await registerDataValidation(data)

            //vérifier si email déjà présent dans la base
            const userExist = await UserModel.findOne({ email: data.email })
            if (userExist) throw new Error('cet email est déjà utilisé')

            //haacher le mot de passe
            const hashPassword = await bcrypt.hash(data.password, 10)
            data.password = hashPassword

            //enregistrer dans la dataBase avec le status connecté
            const user = new UserModel(data)
            await user.save()

            //enregistrer dans userConnected

            await auth.addUserToConnectedUser(user._id)

            //créer un token et le renvoyer
            const { cookie, token } = await auth.createTokenAndCookie(user._id)
            res.cookie(cookie.key, cookie.value, cookie.option).send({ token })

        } catch (error) {
            res.status(400).send(`${error}`)
            
        }
    }

    private login = async (req:Request,res: Response)=>{
        try {
            //on récupère mail et le mot de passe
            const data: dataLoginInterface =req.body

            //on vérifie que le mail existe //si ne trouve envoie une erreur??
            const userFromDB = await UserModel.findOne({ email: data.email })
            if(!userFromDB) throw new Error(`cet email n'existe pas`)
            //on compare au mot de passe
             const match = await bcrypt.compare(data.password,userFromDB.password)
             if(!match) throw new Error('erreur de password')
            //on créer le token et le cookie
            const {cookie,token} = await auth.createTokenAndCookie(userFromDB._id)
            res.cookie(cookie.key,cookie.value,cookie.option).send({token})

        } catch (error) {
            res.status(400).send(`${error}`) 
        }
    }

    private logout = async (req: interfaceRequest, res: Response)=>{
        try {
            const userId = <string>req.userId
            //on modifie le tableau des connected
            await auth.deleteUserToConnectedUser(userId)
            //on supprime token et cookie
            res.clearCookie('userSessionId').send('utilisateur déconnecté')
            
        } catch (error) {
            res.status(400).send(error) 
        }
    }

}

const connectionController = new Connection()

export default connectionController