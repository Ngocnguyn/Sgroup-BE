const express = require('express');
const userValidate = require('../middlewares/userValidate');
const router = express.Router();

let users = [
    {
        "id": 1,
        "fullname": "Nguyen Huy Tuong",
        "gender": true,
        "age": 18
    },
    {
        "id": 2,
        "fullname": "Nguyen Thi Tuong",
        "gender": false,
        "age": 15
    }
];

router.get('/', (req, res) => {
    res.json(users);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

router.post('/',userValidate, (req, res) => {
    const user = {
        id: users.length + 1,
        fullname: req.body.fullname,
        gender: req.body.gender,
        age: req.body.age
    }
    users.push(user);
    res.json(user);
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    users = users.filter(user => user.id !== parseInt(id));
    res.json(user);
});
router.put('/:id',userValidate, (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    user.fullname = req.body.fullname;
    user.gender = req.body.gender;
    user.age = req.body.age;
    res.json(user);
});
module.exports = router;