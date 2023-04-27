import UserService from './user.service.js';
class UserController {
    getAllUsers = async (req,res,next) => {
        const users = await UserService.getAll();
        return res.status(200).json(users);
    }
    getUserById = async (req, res, next) => {
        const user = await UserService.getById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User does not exist.' });
        }
        return res.status(200).json(user);
    }
    createNewUser = async (req, res, next) => {
        let newUser = {
            fullname: req.body.fullname,
            gender: req.body.gender,
            age: req.body.age,
            password: req.body.password
        };
        await UserService.create(newUser);
        return res.status(201).json(newUser);
    }

    updateUser = async (req, res, next) => {
        let user = await UserService.getById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User does not exist.' });
        }

        user = {
            ...user,
            fullname: req.body.fullname,
            gender: req.body.gender,
            age: req.body.age,
            password: req.body.password
        };

        try {
            await UserService.update(req.params.id, user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }

        return res.status(204).json();
    }

    removeUser = async (req, res, next) => {
        const user = await UserService.getById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User does not exist.' });
        }

        try {
            await UserService.removeById(req.params.id);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(204).json();
    }
}

export default new UserController();