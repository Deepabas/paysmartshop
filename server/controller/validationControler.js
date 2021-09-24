const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");


//register validation
const registerValidation = data => {
    const schema = Joi.object({ 
        name: Joi.string().alphanum() .min(3) .required(),
        email: Joi.string() .min(6) .required() .email(),
        password: passwordComplexity().required(),
        // phoneNumber:Joi.number().min(10).required()
     }).unknown();
        
     return  schema.validate(data);
    }
    
     //login validation
        const loginValidation = (data)=> {
            const  schema = Joi.object({
                name: Joi.string().alphanum() .min(3) .required(),
                password:Joi.string().required(),
            }).unknown();
            return schema.validate(data);
        
            }
        
        module.exports.registerValidation = registerValidation;
        module.exports.loginValidation = loginValidation;
    