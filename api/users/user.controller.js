import UserService from './user.service.js';
class UserController {
    getAllUsers = async (req, res, next) => {
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 2;
        const offset = (page - 1) * pageSize;
        const users = await UserService.getAll(offset, pageSize);
        return res.status(200).json(users);
    };
    searchUsers = async (req, res, next) => {
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 2;
        const offset = (page - 1) * pageSize;
        const search = req.query.name;
        const users = await UserService.searchUsers(offset, pageSize, search);
        return res.status(200).json(users);
    };
    getUserById = async (req, res, next) => {
        const user = await UserService.getById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "User does not exist." });
        }
        return res.status(200).json(user);
    };
    createNewUser = async (req, res, next) => {
        let newUser = {
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender
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
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
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