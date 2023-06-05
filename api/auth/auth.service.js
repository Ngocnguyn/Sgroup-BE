import jwt from 'jsonwebtoken';
import 'dotenv/config';
import connection from '../../database/connection.js';
import {getOne,create} from '../../database/query.js';
import { HashHelper } from '../../helper/index.js';
import {MailService} from '../../api/mail/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const privateKey = fs.readFileSync(path.join(fileName, "../../../secret/private-key.pem"));

class AuthService{
    async checkExist(username){
        const user = await getOne(
            {
                db: connection,
                query: 'SELECT * FROM users WHERE username = ?',
                params: [username]
            }
        );
        return user != null;
    }
    async register(user){
        const {salt,hashedPassword} = HashHelper.hashPassword(user.password);
        return await create({
            db: connection,
            query: 'INSERT INTO users(username,password,salt,name,age,gender,email) VALUES (?,?,?,?,?,?,?)',
            params: [user.username,hashedPassword,salt,user.name,user.age,user.gender,user.email]
        });
    }
    // Nhap vao username va password
    async getToken(username,password){
        const user = await getOne(
            {
                db: connection,
                query: 'Select * from users where username = ?',
                params: [username]
            }
        );
       
        if(user && HashHelper.comparePassword({hashPassword:user.password,salt:user.salt,rawPassword: password})){
            return jwt.sign({
                id: user.id,
                username: user.name
            }, privateKey, {
                algorithm: 'RS256',
                expiresIn: "1d",
            });
        }
        return null;
    }
    async getByEmail(email){
        const user = await getOne(
            {
                db: connection,
                query: 'SELECT * from users WHERE email = ?',
                params: [email]
            }
        )
        return user;
    }
    // Them tokenforgetpassword va time  
    async generateForgetPasswordToken(id){
        const user = await getOne(
            {
                db: connection,
                query: 'SELECT * from users WHERE id = ?',
                params: [id]
            }
        );
        if(!user){
            return {
                message: 'User not found',
            }
        }
        
        const forgetPasswordToken = HashHelper.genrateRandomToken();
        const forgetPasswordTokenExpiration = new Date (
            Date.now() + 30 * 60 * 1000
        );
        const updateTokenQuery = await getOne(
            {
                db: connection,
                query: 'UPDATE users SET forget_password_token = ?, forget_password_token_expiration = ? where id = ?',
                params: [forgetPasswordToken, forgetPasswordTokenExpiration, id]
            }
        );
        return forgetPasswordToken;
    }
    // Gui token ve email
    async sendForgetPasswordMail(user, forgetPasswordToken) {
        console.log(forgetPasswordToken);
        await MailService.sendEmail(
            user.email,
            "Change Password",
            forgetPasswordToken
        );
    }
    // Doi password dựa trên token gửi về, update thì cần token và newpassword
    async resetPassword(token, password){
        const user = await getOne(
            {
                db: connection,
                query: "Select * from users where forget_password_token = ?",
                params: [token],
            }
        )
        if(!user){
            return { message: "Invalid token" };
        }
        if (user.forgetPasswordTokenExpiration < new Date()){
            return { message: "Forget Password has already expired" };
        }
        const {salt, hashedPassword} = HashHelper.hashPassword(password);
        const updateToken = await getOne(
            {
                db: connection,
                query: 'update users set password = ?, salt = ?, forget_password_token = ?, forget_password_token_expiration = ? where id =?',
                params: [hashedPassword, salt, null, null, user.id]
            }
        )
    }

}
export default new AuthService();