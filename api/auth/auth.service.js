import jwt from 'jsonwebtoken';
import 'dotenv/config';
import connection from '../../database/connection.js';
import {getOne,create} from '../../database/query.js';
import { HashHelper } from '../../helper/index.js';

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
        console.log(user);
        if(user && HashHelper.comparePassword({hashPassword:user.password,salt:user.salt,rawPassword: password})){
            return jwt.sign({
                id: user.id,
                username: user.name
            }, process.env.JWT_SECRET);
        }
        return null;
    }
}
export default new AuthService();