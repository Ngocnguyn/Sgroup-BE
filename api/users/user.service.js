import connection from "../../database/connection.js";
class UserService{
    async getAll(){
        const user = await connection.query('SELECT * FROM users');
        return user;
    }
    async getById(id){
        const user = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
        return user;
    }
    async create(user){
        await connection.query('INSERT INTO USERS(GENDER, FULLNAME, AGE, PASSWORD) VALUES(?, ?, ?, ?);', [user.gender, user.fullname, user.age, user.password]);
        const [record] = await connection.query('SELECT LAST_INSERT_ID() AS ID;');
        user.id = record[0].ID;
        return user;
    }
    async update(id, user) {
        await connection.query('UPDATE USERS SET GENDER = ?, FULLNAME = ?, AGE = ?, PASSWORD = ? WHERE ID = ?', [user.gender, user.fullname, user.age, user.password, id]);
    }

    async removeById(id) {
        await connection.query('DELETE FROM USERS WHERE ID = ?', [id]);
    }
}
export default new UserService();
