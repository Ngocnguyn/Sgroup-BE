const db = require("../database/connection");
exports.getAllUsers = (req, res, next) => {
  return db.query("Select * from user", (err, result) => {
    if(err){
        return res.status(500).json({messenger: err});
    }
    res.json(result)
  });
};

exports.getUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  return db.query("select * from user where id = ?", [id], (err, result) => {
    if(err){
        return res.status(500).json({messenger: err});
    }
    res.json(result)
  });
};

exports.postAddUser = (req, res, next) => {
  const newUser = req.body;
  return db.query(
    "insert into user (fullname,gender,age) Values (?,?,?)",
    [newUser.fullname, newUser.gender, newUser.age],
    (err, result) => {
        if(err){
            return res.status(500).json({messenger: err});
        }
        res.json(result)
    }
  );
};

exports.deleteUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  return db.query("delete from user where id = ?", [id], (err, result) => {
    if(err){
        return res.status(500).json({messenger: err});
    }
    res.json(result)
  });
};
exports.putUpdateUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  const newUser = req.body;
  return db.query(
    "update user set fullname = ?, gender = ?, age = ? where id = ?",
    [newUser.fullname, newUser.gender, newUser.age],
    (err, result) => {
        if(err){
            return res.status(500).json({messenger: err});
        }
        res.json(result)
    }
  );
};