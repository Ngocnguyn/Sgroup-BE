import ProfileService from "./profile.service.js";
class ProfileController{
    async getUser(req,res,next){
        const user = await ProfileService.getUser(req.param.id);
        return res.status(200).json(user);
    }
    async updateProfile(req,res,next){
        const idToken = req.session.id;
        if(idToken == req.params.id){
            const result = await ProfileService.updateProfile(req.params.id,req.body);
            return res.status(200).json(result);
        }
        else{
            return res.status(401).json({message: "Wrong token"});
        }
    }
    
}
export default new ProfileController();