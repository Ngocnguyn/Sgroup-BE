import connection from "../../database/connection.js";

class UserService {
  async getAll(offset, pageSize) {
    const users = await knex("USERS")
        .select("*")
        .limit(pageSize)
        .offset(offset);
    return users;
  }
  async getById(id) {
    const user = await knex("USERS").select("*").where("id", id).first();
    return user;
  }
  async searchUsers(offset, pageSize, search) {
    const users = await knex("USERS")
        .select("*")
        .limit(pageSize)
        .offset(offset)
        .where("name", "like", `%${search}%`);
    return users;
  }
  async create(user) {
    await knex("USERS").insert({
        name: user.name,
        age: user.age,
        gender: user.gender,
    });
    const [record] = await knex.raw("SELECT LAST_INSERT_ID() AS id");
    user.id = record[0].id;
    return user;
  }

  async update(id, user) {
    await knex("USERS").where("id", id).update({
        name: user.name,
        age: user.age,
        gender: user.gender,
    });
  }
  async removeById(id) {
    await knex("USERS").where("id", id).del();
  }
}

export default new UserService();
