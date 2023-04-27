import jwt from 'jsonwebtoken';
import 'dotenv/config';
import connection from '../../database/connection.js';
import {getOne,update} from '../../database/query.js';
import { HashHelper } from '../../helper/index.js';

class ProfileService{
    async getUser(id){
        const user = await getOne(
        {
            db: connection,
            query: 'SELECT * FROM users WHERE id = ?',
            params: [id]

        });
        return {name: user.name, age: user.age, gender: user.gender};
    }
    async updateProfile(id,body){
        const {name,age,gender} = body;
        return  update({
            db: connection,
            query: 'UPDATE users SET name = ?, age = ?, gender = ? WHERE id = ?',
            params: [name,age,gender,id]
        });
    }
}
export default new ProfileService();