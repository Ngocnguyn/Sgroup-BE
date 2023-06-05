import Joi from 'joi';
const registerSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .required(),

    password: Joi.string().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmpassword: Joi.ref('password'),
    name: Joi.string().required().min(3),
    age: Joi.number().min(0).max(100),
    gender: Joi.bool().required(),
    email: Joi.string().email()
});
const loginSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});


export {registerSchema,loginSchema} 