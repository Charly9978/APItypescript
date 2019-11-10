import Joi from '@hapi/joi'

interface dataInterface {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(30),
    lastName: Joi.string().required().min(3).max(30),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password:Joi.string().regex(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,50})/),

})

const registerDataValidation = async (data:dataInterface)=>{
    try {
        return await schema.validateAsync(data)
    } catch (error) {
        throw error
    }
} 

export default registerDataValidation