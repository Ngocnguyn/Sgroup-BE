import connection from "../../database/connection.js";

class UserService {
  async getAll() {
    const users = await connection.select().from('users');
    return users;
  }
  async searchUsers(offset, pageSize, search) {
    const users = await knex("USERS")
        .select("*")
        .limit(pageSize)
        .offset(offset)
        .where("name", "like", `%${search}%`);
    return users;
  }
  async getById(id) {
    const user = await connection.select().from('users').where('ID', id).first();
    return user;
  }

  async create(user) {
    const id = await connection('users').insert(
        { NAME: user.name, AGE: user.age, GENDER: user.gender}
    ).returning(['ID'])
    user.id = id[0];
    return user;
  }

  async update(id, user) {
    await connection('users').where('id', id).update({
      name: user.name,
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
