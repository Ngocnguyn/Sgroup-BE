import AuthService from "./auth.service.js";
class AuthController{
    async register(req,res){
        const {username,password,confirmpassword,name,age,gender,email} = req.body;
        // Neu username da ton tai thi tra ve 409
        if(await AuthService.checkExist(username)){
            return res.status(409).json(
                {
                    message: 'Username already exist'
                }   
            );
        }
        // Neu username chua ton tai thi tao tai khoan
        await AuthService.register({username,password,name,age,gender,email});
        return res.status(200).json(
            {
                message: 'Register success'
            }
        )
    }
    async login(req,res){
        const {username, password} = req.body;
        const token = await AuthService.getToken(username,password);
        // neu token = null thi tra ve 401
        if(!token){
            return res.status(401).json(
                {
                    message: 'Username or password is incorrect'
                }
            );
        }
        return res.status(200).json(
            {
             token: token
            }
        );
    }
    async requestForgetPassword (req, res, next) {
        const {email} = req.body;
        const user = await AuthService.getByEmail(email);
        if(!user){
            return res.status(401).json(
                {
                    message: 'User does not exist'
                }
            )
        }
        const forgetPasswordToken = await AuthService.generateForgetPasswordToken(user.id);
        await AuthService.sendForgetPasswordMail(user, forgetPasswordToken);
        return res.status(200).json({
            message: 'Please check your mail to get token'
        })
    }
    async resetPassword(req, res, next){
        const {token, password} = req.body;
        await AuthService.resetPassword(token, password);
        return res.status(200).json({
            message: 'Password reset successfully'
        });
    }   
}
export default new AuthController();