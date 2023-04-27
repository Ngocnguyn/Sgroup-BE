import { registerSchema, loginSchema } from "../helper/validate.js";
const registerValidation = (req,res,next) => {
    registerSchema.validateAsync(req.body).then(() => next()).catch(err => {
        res.status(400).json(err.details);
    });
}
const loginValidation = (req,res,next) => {
    loginSchema.validateAsync(req.body).then(() => next()).catch(err => {
        res.status(400).json(err.details);
    });
}
export {registerValidation, loginValidation} 