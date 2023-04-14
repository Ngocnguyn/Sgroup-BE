function checkNameValidity(name) {
    const regex = /^[a-zA-Z ]*$/; 
    return regex.test(name);
}

module.exports = (req, res, next) => {
    const newUser = { ...req.body };
    if (newUser.age < 0) {
        return res.status(400).json({ message: 'Age must be greater than zero' });
    }
    if (!checkNameValidity(newUser.fullname)) {
        return res.status(400).json({ message: 'Fullname must be a valid name' });
    }
    next();
};
