import {Router} from 'express'

interface controller{
    router:Router,
    path:string
}

export default controller