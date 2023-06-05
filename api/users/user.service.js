import connection from "../../database/connection.js";

class UserService {
  async getAll() {
    const users = await connection.select().from('users');
    return users;
  }
  async getUserWithPaging(page, size, username) {
    const users = await connection.select().where('USERNAME', 'like', `%${username ?? ''}%`).from('users').limit(size).offset((page - 1) * size);
    return users;
  } 
  async getById(id) {
    const user = await connection.select().from('users').where('ID', id).first();
    return user;
  }

  async create(user) {
    const id = await connection('users').insert(
        { NAME: user.fullname, AGE: user.age, GENDER: user.gender, PASSWORD: user.password }
    ).returning(['ID'])
    user.id = id[0];
    return user;
  }

  async update(id, user) {
    await connection('users').where('id', id).update({
      GENDER: user.gender,
      FULLNAME: user.fullname,
      AGE: user.age,
      PASSWORD: user.password
    });
  }

  async removeById(id) {
    await connection('users').where('ID', id).del();
  }
}

export default new UserService();
